// import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { createTuition } from '../backend/tuition';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../backend/user';

const PaymentComponent = () => {

  const { data: thisUserData } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  });

  const [selectedPlan, setSelectedPlan] = useState<'Plan Bronze' | 'Plan Plata' | 'Plan Oro' | ''>('');
  const [showModal, setShowModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const queryClient = useQueryClient()

  const createTuitionMutation = useMutation({
    mutationFn: createTuition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["this_tuitions", "this_recent_tuition"] })
    }
  })

  const planDetails: Record<'Plan Bronze' | 'Plan Plata' | 'Plan Oro', { price: number; description: string }> = {
    'Plan Bronze': {
      price: 10,
      description:
        'Perfecto para iniciarte en el tenis. Accede a la plataforma para revisar tus estadísticas básicas, agendar entrenamientos ocasionales y participar en torneos locales.',
    },
    'Plan Plata': {
      price: 20,
      description:
        'Ideal para jugadores comprometidos. Monitorea tu desempeño con estadísticas detalladas, organiza entrenamientos frecuentes y accede a torneos nacionales.',
    },
    'Plan Oro': {
      price: 30,
      description:
        'Diseñado para los más competitivos. Disfruta de estadísticas avanzadas, entrenamientos ilimitados y prioridad en la inscripción a torneos internacionales.',
    },
  };

  const handlePayment = (plan: 'Plan Bronze' | 'Plan Plata' | 'Plan Oro') => {
    setSelectedPlan(plan);
    setPaymentAmount(planDetails[plan].price);
    setShowModal(true);
  };

  const confirmPayment = async () => {
    setLoading(true);
    setError('');

    try {
      if (!thisUserData?.id_persona) {
        throw new Error('Usuario no autenticado');
      }

      if (selectedPlan && paymentAmount !== null) {
        await createTuitionMutation.mutateAsync({
          id_persona: thisUserData.id_persona,
          monto_usd: paymentAmount
        })
        alert(`Pago confirmado para el ${selectedPlan} por $${paymentAmount}`);
        setShowModal(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[800px] w-full shadow-black shadow-lg rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-950">
        <h1 className="text-2xl font-bold text-center text-white">Realiza tu pago</h1>
        <h1 className="text-l text-left text-white mb-7 mt-5">Elige una membresía</h1>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(planDetails).map(([plan, details]) => (
            <div
              key={plan}
              className="text-left rounded-lg shadow-gray-800 shadow-lg p-[20px] bg-sky-500/35 flex flex-col justify-between"
            >
              <p className="text-sm font-bold mb-4">{plan}</p>
              <p className="text-sm text-gray-400 mb-7">{details.description}</p>
              <button
                onClick={() => handlePayment(plan as 'Plan Bronze' | 'Plan Plata' | 'Plan Oro')}
                className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
              >
                Pagar ${details.price}
              </button>
            </div>
          ))}
        </div>

        {loading && <p className="text-center text-white">Procesando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {showModal && paymentAmount !== null && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-75 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Confirmación de Pago</h2>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas pagar <strong>${paymentAmount}</strong> por el{' '}
                <strong>{selectedPlan}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmPayment}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentComponent
