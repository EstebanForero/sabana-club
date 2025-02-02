
import React from 'react'
import { RequestContent } from 'src/backend/entities'

type Props = {
  requestContent: RequestContent
}

const RequestContentVisualizer = ({ requestContent }: Props) => {
  return (
    <div>
      <h1>User requested values</h1>
      <p>Nombre: {requestContent.UpdateUser.user_updation.nombre}</p>
      <p>Email: {requestContent.UpdateUser.user_updation.correo}</p>
      <p>Phone: {requestContent.UpdateUser.user_updation.telefono}</p>
    </div>
  )
}

export default RequestContentVisualizer
