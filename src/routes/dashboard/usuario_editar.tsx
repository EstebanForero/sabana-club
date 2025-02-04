import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getUserByIdentification, getCurrentUser, updateCurrentUser, updateUser } from '../../backend/user'
import UserForm from '../../components/userForm'
import { UserInfo, UserCreationInfo } from '../../backend/entities'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/dashboard/usuario_editar')({
  component: RouteComponent,
})

function RouteComponent() {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [succesfullMessage, setSuccesfullMessage] = useState('')

  const navigate = useNavigate();
  const onSearchUser = () => {
    // Si un usuario ha sido seleccionado, redirigimos a la página de informes del usuario
    navigate({ to: '/dashboard/usuarios' });
  };

  const showToast = (variant: 'succesfull' | 'error', message: string) => {
    if (variant == 'succesfull') {
      setSuccesfullMessage(message)
      setTimeout(() => setSuccesfullMessage(''), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  useEffect(() => {
    const userId = sessionStorage.getItem('selectedUserId') // O cualquier otro nombre de clave
    if (userId) {
      getUserByIdentification(userId)
        .then((userData) => {
          setUserInfo(userData)
          setLoading(false)
        })
        .catch((error) => {
          setErrorMessage('Error al cargar los datos del usuario')
          setLoading(false)
          console.error(error)
        })
    } else {
      getCurrentUser()
        .then((userData) => {
          setUserInfo(userData)
          setLoading(false)
        })
        .catch((error) => {
          setErrorMessage('Error al cargar los datos del usuario actual')
          setLoading(false)
          console.error(error)
        })
    }
  }, [])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (!userInfo) {
    return <p>No se encontró información del usuario.</p>
  }

  const sendUpdateRequest = async (userCreationInfo: UserCreationInfo) => {
    try {
      // Debes pasar el user_id (por ejemplo, de 'userInfo')
      if (userInfo) {
        await updateUser(userCreationInfo, userInfo.id_persona); // Aquí le pasas el ID del usuario
        showToast('succesfull', 'Datos de usuario actualizados exitosamente');
      } else {
        throw new Error("No se encontró el ID del usuario");
      }
    } catch (error) {
      showToast('error', 'Error al actualizar los datos');
    }
  };


  // Aquí llenamos el campo 'contrasena' con un valor vacío para que UserCreationInfo sea válido
  const initialUserData: UserCreationInfo = {
    ...userInfo,  // Propiedades que vienen de 'UserInfo'
    contrasena: '', // Agregamos la propiedad contrasena con valor vacío
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-20">
      <div className="toast toast-top toast-end">
        {succesfullMessage && (
          <div className="alert alert-success">
            <span>{succesfullMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-lg"> {/* Esta es la caja que se va a centrar */}
        <UserForm
          onSuccessfulSend={sendUpdateRequest}
          initialData={initialUserData}  // Pasamos los datos iniciales completos
          buttonName="Actualizar datos"
          showPasswordFields={false}
          exemptValues={{ email: userInfo.correo, phone: userInfo.telefono.toString() }}
        />
        <div className="flex justify-center mt-4 gap-6 w-full max-w-lg">
          <div>
            <button
              onClick={onSearchUser}
              className="min-w-[200px] min-h-[55px] bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-colors duration-200 text-xl"
            >
              Atrás
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
