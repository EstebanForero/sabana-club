import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react'
import { GiTennisRacket } from 'react-icons/gi'
import { validateNumericInput } from '../../validations/validations'
import { useQuery } from '@tanstack/react-query'
import { getTrainingsForCurrentUser } from '../../backend/training'

// Definición de la ruta
export const Route = createFileRoute('/user_dashboard/training')({
  component: RouteComponent,
})

// Componente principal para el enrutador
export default function App() {
  return <RouteComponent />
}

// Componente para la ruta
function RouteComponent() {
  const [duration, setDuration] = useState<number | ''>('') // State for duration
  const [loading, setLoading] = useState<boolean>(false) // Estado de carga

  const { data: entrenamientos,isLoading } = useQuery({
    queryKey: ["this-trainings"],
    queryFn: getTrainingsForCurrentUser
  })
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen flex-item justify-center ">
      <div className=" w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col gap-6 bg-gray-950">
        <h1 className="text-2xl font-bold text-center text-white">
          Tus Entrenamientos
        </h1>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul>
              {entrenamientos.map((entrenamiento) => (
                <li key={`${entrenamiento.nombre_entrenamiento}`}>{entrenamiento.tiempo_minutos}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
