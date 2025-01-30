import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react'
import { GiTennisRacket } from 'react-icons/gi'
import { validateNumericInput } from '../../validations/validations'

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
  const [entrenamientos, setEntrenamientos] = useState<string[]>([]) // Lista de entrenamientos
  const [loading, setLoading] = useState<boolean>(false) // Estado de carga

  // Solicita datos al backend al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const entrenamientosResponse = await fetch('/api/entrenamientos') // Endpoint para entrenamientos

        const entrenamientosData = await entrenamientosResponse.json()

        setEntrenamientos(entrenamientosData)
      } catch (error) {
        console.error('Error al cargar datos del backend:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex-item justify-center ">
        <div className=" w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col gap-6 bg-gray-950">
          <h1 className="text-2xl font-bold text-center text-white">
            Tus Entrenamientos
          </h1>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 1</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 2</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 3</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 4</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 5</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 6</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 7</div>
              <div className="bg-blue-500 text-white p-4 rounded">entrenamiento 8</div>
            </div>
          </div>
        </div>
    </div>
  )
}
