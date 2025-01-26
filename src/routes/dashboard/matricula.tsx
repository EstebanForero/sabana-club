import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/matricula')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePayment = (plan: string) => {
    setSelectedPlan(plan);
    setShowModal(true); 
  };

  const confirmPayment = () => {
    setShowModal(false);
    alert(`Pago confirmado para el ${selectedPlan}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-950">
        <h1 className="text-2xl font-bold text-center text-white">Realiza tu pago</h1>
        <h1 className="text-l text-left text-white mb-7 mt-5">Elige una membresía</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-left rounded-lg shadow-gray-800 shadow-lg p-[20px] bg-sky-500/35">
            <p className="text-sm font-bold mb-4">Plan Bronze</p>
            <p className="text-sm text-gray-400 mb-7">
              Perfecto para iniciarte en el tenis. Accede a la plataforma para revisar tus estadísticas básicas, agendar entrenamientos ocasionales y participar en torneos locales.
            </p>
            <button
              onClick={() => handlePayment('Plan Bronze')}
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              USD 10$
            </button>
          </div>
          <div className="text-left rounded-lg shadow-gray-800 shadow-lg p-[20px] bg-sky-500/35">
            <p className="text-sm font-bold mb-4">Plan Plata</p>
            <p className="text-sm text-gray-400 mb-7">
              Ideal para jugadores comprometidos. Monitorea tu desempeño con estadísticas detalladas, organiza entrenamientos frecuentes y accede a torneos nacionales.
            </p>
            <button
              onClick={() => handlePayment('Plan Plata')}
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              USD 20$
            </button>
          </div>
          <div className="text-left rounded-lg shadow-gray-800 shadow-lg p-[20px] bg-sky-500/35">
            <p className="text-sm font-bold mb-4">Plan Oro</p>
            <p className="text-sm text-gray-400 mb-7">
              Diseñado para los más competitivos. Disfruta de estadísticas avanzadas, entrenamientos ilimitados y prioridad en la inscripción a torneos internacionales.
            </p>
            <button
              onClick={() => handlePayment('Plan Oro')}
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              USD 30$
            </button>
          </div>
        </div>

        
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4 text-black">Confirmación de Pago</h2>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas pagar por el <strong>{selectedPlan}</strong>?
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
