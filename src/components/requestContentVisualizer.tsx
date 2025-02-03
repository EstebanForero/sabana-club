
import React from 'react'
import { DeleteTournamentRequest, RequestContent, UserUpdateRequest } from 'src/backend/entities'
import { useQuery } from '@tanstack/react-query'
import { getTournament } from '../backend/tournament'

type Props = {
  requestContent: RequestContent
}

const RequestContentVisualizer = ({ requestContent }: Props) => {


  const getElementToRender = (requestContent: RequestContent) => {
    if (requestContent.type == 'UpdateUser') {
      return <UserUpdateRequestComponent user_update_request={requestContent as UserUpdateRequest} />
    } else if (requestContent.type == 'DeleteTournament') {
      return <DeleteTournamentRequestComponent delete_tournament_request={requestContent as DeleteTournamentRequest} />
    }
  }

  return (
    <div>
      {getElementToRender(requestContent)}
    </div>
  )
}

export default RequestContentVisualizer

type UserUpdateRequestProps = {
  user_update_request: UserUpdateRequest
}

const UserUpdateRequestComponent = ({ user_update_request }: UserUpdateRequestProps) => {
  return (
    <div>
      <h1>User requested values</h1>
      <p>Nombre: {user_update_request.user_updation.nombre}</p>
      <p>Email: {user_update_request.user_updation.correo}</p>
      <p>Phone: {user_update_request.user_updation.telefono}</p>
    </div>
  )
}

type DeleteTournamentRequestProps = {
  delete_tournament_request: DeleteTournamentRequest
}

const DeleteTournamentRequestComponent = ({ delete_tournament_request }: DeleteTournamentRequestProps) => {

  const { data: tournamentInfo } = useQuery({
    queryKey: [`tournament_${delete_tournament_request.tournament_id}`],
    queryFn: async () => getTournament(delete_tournament_request.tournament_id)
  })

  return (
    <div>
      <h1>Torneo a borrar</h1>
      <p>Nombre: {tournamentInfo?.nombre}</p>
    </div>
  )
}
