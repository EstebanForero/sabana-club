
import React from 'react'
import { RequestCommand } from '../backend/entities'
import { useQuery } from '@tanstack/react-query'
import { getUserByIdentification } from 'src/backend/user'

type Props = {
  request: RequestCommand
}

const requestComponent = ({ request }: Props) => {

  const { data: requesterInfo } = useQuery({
    queryKey: [`user-${request.requester_id}`],
    queryFn: async () => getUserByIdentification(request.requester_id)
  })

  if (!requesterInfo) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  return (
    <div>
      <h1>Request to {request.command_name}</h1>
      <p>Request made by {requesterInfo.nombre}</p>
    </div>
  )
}

export default requestComponent
