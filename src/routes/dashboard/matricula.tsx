import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { createTuition, getRecentTuitionForCurrentUser, getTuitionsForCurrentUser } from '../../backend/tuition';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../../backend/user';
import UserSelectionComponent from './../../components/userSelectionComponent';
import { getFutureDateAndRemainingDays } from '../../utils/utils'

export const Route = createFileRoute('/dashboard/matricula')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userId, setUserId] = useState<undefined | string>()

  const { data: thisUserData } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  });

  const { data: userTuitions } = useQuery({
    queryKey: ["this_tuitions"],
    queryFn: getTuitionsForCurrentUser
  })
  
  const { data: userMostRecentTuition } = useQuery({
    queryKey: ["this_recent_tuition"],
    queryFn: getRecentTuitionForCurrentUser
  })

  

  return (
    <div className='flex flex-col gap-4 w-full h-full justify-evenly min-h-screen'>
        <div>
          <UserSelectionComponent onChangeUser={(user_id) => setUserId(userId)} />
            <button type='submit'>
              Submit
            </button>
        </div>
        <div className='flex flex-row justify-evenly gap-4 w-full'>
          <div>
            <h1 className='text-2xl font-bold mb-8'>Historial de pagos de matricula</h1>
            {userTuitions?.map((userTuition, index) => <div key={index} className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
              <h2 className='font-semibold text-xl mb-6'>Matricula</h2>
              <p>Monto pagado: {userTuition.monto_usd} USD</p>
              <p>Fecha de pago: {userTuition.fecha_inscripccion}</p>
            </div>)}
          </div>
    
          <div>
            <h1 className='text-2xl font-bold mb-8'>Tu pago de matricula mas actual es</h1>
            {userMostRecentTuition ?
              <div className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
                <p className='mb-4'>Monto pagado: {userMostRecentTuition.monto_usd} USD</p>
                <p className='mb-4'>Fecha de pago: {userMostRecentTuition.fecha_inscripccion}</p>
                {getFutureDateAndRemainingDays(userMostRecentTuition.fecha_inscripccion).daysRemaining == 0 ?
                  <p>Se vencio tu matricula anterior, paga en cuanto puedas</p>
                  :
                  <p>Aun te quedan {getFutureDateAndRemainingDays(userMostRecentTuition.fecha_inscripccion).daysRemaining} dias con el ultimo pago de matricula</ p>
                }
              </div> : <p>Loading ...</p>}
          </div>
        </div>
    </div>
  );
}
