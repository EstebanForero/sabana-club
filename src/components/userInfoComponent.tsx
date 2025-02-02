
import React from 'react'
import { UserInfo } from 'src/backend/entities'

type Props = {
  userInfo: UserInfo
  className?: string
}

const UserInfoComponent = ({ userInfo, className }: Props) => {
  return (
    <div className={className}>
      <div className='flex flex-col'>
        <p className='grow'>{userInfo.nombre}</p>
        <p>{userInfo.nombre_tipo_identificacion}</p>
      </div>
      <p>{userInfo.telefono}</p>
      <p>{userInfo.correo}</p>
    </div>
  )
}

export default UserInfoComponent
