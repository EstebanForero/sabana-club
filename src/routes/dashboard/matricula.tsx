import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { createTuition, getRecentTuitionForCurrentUser, getTuitionsForCurrentUser, getTuitionsForUser, getMostRecentTuition } from '../../backend/tuition';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../../backend/user';
import UserSelectionComponent from './../../components/userSelectionComponent';
import { getFutureDateAndRemainingDays } from '../../utils/utils'

export const Route = createFileRoute('/dashboard/matricula')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [submittedUserId, setSubmittedUserId] = useState<string | undefined>();
  const [showUserSelector, setShowUserSelector] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: thisUserData } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  });

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUserId(selectedUserId);
    if (!selectedUserId) {
      alert('Please select a user');
      return;
    } else {
      setShowUserSelector(false);
      setShowDropdown(false);
    }
    // setShowUserSelector(false);
  };

  const handleChangeUser = () => {
    setShowUserSelector(true);
    setSubmittedUserId(undefined);
  };


  const { data: userTuitions } = useQuery({
    queryKey: ["user_tuitions", submittedUserId],
    queryFn: () => {
      if (submittedUserId) {
        return getTuitionsForUser(submittedUserId);
      }
      return getTuitionsForCurrentUser();
    },
    enabled: !!submittedUserId || !!thisUserData?.id_persona
  });

  const { data: userMostRecentTuition } = useQuery({
    queryKey: ["user_recent_tuition", submittedUserId],
    queryFn: () => {
      if (submittedUserId) {
        return getMostRecentTuition(submittedUserId);
      }
      return getRecentTuitionForCurrentUser();
    },
    enabled: !!submittedUserId || !!thisUserData?.id_persona
  });

  // Opcional crearle un pago/matricula a un usuario

  return (
    <div className='flex flex-col gap-4 w-full h-full justify-evenly min-h-screen'>
      <form onSubmit={handleUserSubmit} className="">
        <div className='flex flex-row justify-center gap-4 w-full'>
          {showUserSelector ? (
            <>
              <UserSelectionComponent 
                onChangeUser={(user_id) => {
                  setSelectedUserId(user_id);
                  setShowDropdown(false);
                }}
              />
              <button 
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer'
              >
                Buscar usuario
              </button>
            </>
          ) : (
            <button
              type='button'
              onClick={handleChangeUser}
              className='bg-blue-500 text-white px-4 py-2 rounded-lg h-[60px] hover:bg-blue-600 hover:cursor-pointer'
            >
              Nueva busqueda
            </button>
          )}
        </div>
      </form>

      {submittedUserId && (
        <div className='flex flex-row justify-evenly gap-4 w-full'>
          <div>
            <h1 className='text-2xl font-bold mb-8'>Historial de pagos de matrícula</h1>
            {userTuitions?.map((userTuition, index) => (
              <div key={index} className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg mb-4'>
                <h2 className='font-semibold text-xl mb-6'>Matrícula</h2>
                <p>Monto pagado: {userTuition.monto_usd} USD</p>
                <p>Fecha de pago: {new Date(userTuition.fecha_inscripccion).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          <div>
            <h1 className='text-2xl font-bold mb-8'>Pago de matrícula más reciente</h1>
            {userMostRecentTuition ? (
              <div className='bg-gray-950 rounded-xl p-4 max-w-80 shadow-black shadow-lg'>
                <p className='mb-4'>Monto pagado: {userMostRecentTuition.monto_usd} USD</p>
                <p className='mb-4'>Fecha de pago: {new Date(userMostRecentTuition.fecha_inscripccion).toLocaleDateString()}</p>
                {getFutureDateAndRemainingDays(userMostRecentTuition.fecha_inscripccion).daysRemaining === 0 ? (
                  <p className='text-red-500'>Se vencio tu matricula anterior, paga en cuanto puedas</p>
                ) : (
                  <p className='text-green-500'>
                    Días restantes: {getFutureDateAndRemainingDays(userMostRecentTuition.fecha_inscripccion).daysRemaining}
                  </p>
                )}
              </div>
            ) : (
              <p className='text-gray-400'>No se encontraron pagos recientes</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}