import { createFileRoute, trimPath } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../backend/user'
import UserForm from '../../components/userForm'
import { UserCreationInfo } from '../../backend/entities'
import { CreateRequest } from '../../backend/request'
import { useState } from 'react'

export const Route = createFileRoute('/user_dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: currentUser } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [succesfullMessage, setSuccesfullMessage] = useState('')

  const showToast = (variant: 'succesfull' | 'error', message: string) => {
    if (variant == 'succesfull') {
      setSuccesfullMessage(message)
      setTimeout(() => setSuccesfullMessage(''), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  if (!currentUser) {
    return <p>Loading ...</p>
  }

  const sendUpdateRequest = async (userCreationInfo: UserCreationInfo) => {
    try {
      await CreateRequest({
        type: 'UpdateUser',
        user_updation: {
          nombre_tipo_identificacion: userCreationInfo.nombre_tipo_identificacion.toUpperCase(),
          nombre: userCreationInfo.nombre,
          identificacion: userCreationInfo.identificacion,
          correo: userCreationInfo.correo,
          telefono: userCreationInfo.telefono
        },
        user_id: currentUser.id_persona
      })

      showToast('succesfull', 'Request to update user created successfully')
    } catch (error) {
      showToast('error', 'Error creating request')
    }
  }

  return <div className='flex flex-col h-full justify-center items-center p-20'>
    <div className='toast toast-top toast-end'>
      {succesfullMessage && <div className='alert alert-success'>
        <span>{succesfullMessage}</span>
      </div>}

      {errorMessage && <div className='alert alert-error'>
        <span>{errorMessage}</span>
      </div>}
    </div>
    <div>
      <UserForm onSuccessfulSend={sendUpdateRequest} initialData={{
        identificacion: currentUser.identificacion,
        nombre: currentUser.nombre,
        nombre_tipo_identificacion: currentUser.nombre_tipo_identificacion.toLowerCase(),
        correo: currentUser.correo,
        contrasena: '',
        telefono: currentUser.telefono
      }} buttonName='enviar solicitud para actualizar datos' showPasswordFields={false} exemptValues={{ email: currentUser.correo, phone: currentUser.telefono.toString() }} />
    </div>
  </div>
}
