
import React, { useState } from 'react'
import { RequestCommand } from '../backend/entities'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserByIdentification } from '../backend/user'
import UserInfoComponent from './userInfoComponent'
import { DeleteRequest, ExecuteRequest } from '../backend/request'
import RequestContentVisualizer from './requestContentVisualizer'

type Props = {
  request: RequestCommand
}

const RequestComponent = ({ request }: Props) => {

  const { data: requesterInfo } = useQuery({
    queryKey: [`user-${request.requester_id}`],
    queryFn: async () => getUserByIdentification(request.requester_id)
  })

  const { data: aproverInfo } = useQuery({
    queryKey: [`user-${request.aprover_id}`],
    queryFn: async () => getUserByIdentification(request.requester_id),
    enabled: !(!request.aprover_id)
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

  const AcceptRequest = async () => {
    try {
      await ExecuteRequest(request.request_id)
      showToast('succesfull', "Request accepted succesfully")
      queryClient.invalidateQueries({
        queryKey: ["all_requests"]
      })
    } catch (error) {
      showToast('error', "Error accepting request")
    }
  }

  const queryClient = useQueryClient()

  const CancelRequest = async () => {
    try {
      await DeleteRequest(request.request_id)
      showToast('succesfull', "Request deleting succesfully")
      queryClient.invalidateQueries({
        queryKey: ["all_requests"]
      })
    } catch (error) {
      showToast('error', "Error deleting request")
    }
  }

  if (!requesterInfo) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  return (
    <div className='p-4 bg-gray-950 rounded-xl'>
      <div className='toast toast-top toast-end'>
        {succesfullMessage && <div className='alert alert-success'>
          <span>{succesfullMessage}</span>
        </div>}

        {errorMessage && <div className='alert alert-error'>
          <span>{errorMessage}</span>
        </div>}
      </div>


      <h1 className='text-xl font-bold mb-4'>Solicitud: {request.command_name}</h1>
      <UserInfoComponent userInfo={requesterInfo} className='bg-gray-900 p-2 rounded-xl mb-4' />
      <RequestContentVisualizer requestContent={request.command_content} />
      <div className='my-2 w-full'></div>
      {!request.completed ? <div>
        <button className='bg-green-500 rounded-xl py-1 px-2 mr-4 cursor-pointer' onClick={() => AcceptRequest()}>Accept</button>
        <button className='bg-red-500 py-1 px-2 rounded-xl cursor-pointer' onClick={() => CancelRequest()}>Decline</button>
      </div> : <details className='dropdown'>
        <summary className='bg-green-500 rounded-xl py-1 px-2 cursor-pointer w-full'>Aprovador</summary>
        {aproverInfo && <UserInfoComponent userInfo={aproverInfo} className='bg-green-300 text-black rounded-xl dropdown-content p-2' />}
      </details>}
    </div>
  )
}

export default RequestComponent
