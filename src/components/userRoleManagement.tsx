
import React, { useState } from 'react'
import { roles, UserInfo, UserRol } from '../backend/entities'
import UserInfoComponent from './userInfoComponent'
import { updateUserRole } from '../backend/user'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  userInfo: UserInfo
}

const UserRoleManagement = ({ userInfo }: Props) => {

  const [userRole, setUserRole] = useState(userInfo.nombre_rol)

  const [errorMessage, setErrorMessage] = useState('')
  const [succesfullMessage, setSuccesfullMessage] = useState('')

  const queryClient = useQueryClient()

  const onSelectUserRole = (userRole: UserRol) => {
    setUserRole(userRole)
  }

  const showToast = (variant: 'succesfull' | 'error', message: string) => {
    if (variant == 'succesfull') {
      setSuccesfullMessage(message)
      setTimeout(() => setSuccesfullMessage(''), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  const onUpdateUserRole = async () => {
    try {
      await updateUserRole(userRole, userInfo.id_persona)
      showToast('succesfull', "Rol de el usuario actualizado correctamente")
      queryClient.invalidateQueries({
        queryKey: ["all_users"]
      })

    } catch (error) {
      showToast('error', "Error actualizando rol de el usuario")
    }
  }

  return (
    <div className='bg-gray-800 p-2 rounded-xl shadow-black shadow-lg'>
      <div className='toast toast-top toast-end'>
        {succesfullMessage && <div className='alert alert-success'>
          <span>{succesfullMessage}</span>
        </div>}

        {errorMessage && <div className='alert alert-error'>
          <span>{errorMessage}</span>
        </div>}
      </div>

      <UserInfoComponent userInfo={userInfo} />
      <div className=''>
        <details className="dropdown">
          <summary className="m-1 cursor-pointer bg-blue-500 rounded-sm px-2 py-1">{userRole}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {roles.filter(role => role !== userRole).map((role, index) => <li key={index}>
              <button onClick={() => onSelectUserRole(role)}>{role}</button>
            </li>)}
          </ul>
        </details>
        <button className='bg-blue-500 px-2 py-1 rounded-sm cursor-pointer'
          onClick={() => onUpdateUserRole()}
        >Update</button>
      </div>
    </div>
  )
}

export default UserRoleManagement 
