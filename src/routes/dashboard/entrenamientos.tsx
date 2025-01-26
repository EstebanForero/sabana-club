import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { GiTennisRacket } from 'react-icons/gi';
import { validateNumericInput } from '../../validations/validations'; 

// Definición de la ruta
export const Route = createFileRoute("/dashboard/entrenamientos")({
  component: RouteComponent,
});

// Componente principal para el enrutador
export default function App() {
  return <RouteComponent />;
}

// Componente para la ruta
function RouteComponent() {
  
  const [formType, setFormType] = useState<"crear" | "asistencia" | null>(null);
  const [duration, setDuration] = useState<number | ''>(''); // State for duration

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumericInput(value) && Number(value) >= 0) { // Validate input
      setDuration(Number(value));
    } else {
      setDuration(''); 
    }
  };

  const renderForm = () => {
    if (formType === "crear") {
      return (
        <form className="flex flex-col gap-4 p-4 border rounded shadow-md w-full max-w-md bg-white">
          <h2 className="text-xl font-bold">Formulario Crear Entrenamiento</h2>
          <input
            type="text"
            placeholder="Nombre del entrenamiento"
            className="p-2 border rounded"
          />
          <input type="date" className="p-2 border rounded" />
          <input
            type="number"
            placeholder="Duracíon del entrenamiento en horas"
            className="p-2 border rounded"
            value={duration} 
            onChange={handleDurationChange} 
            min="0" 
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear
          </button>
        </form>
      );
    }

    if (formType === "asistencia") {
      return (
        <form className="flex flex-col gap-4 p-4 border rounded shadow-md w-full max-w-md bg-white">
          <h2 className="text-xl font-bold">Formulario Asistencia</h2>
          <input
            type="text"
            placeholder="Nombre del entrenamiento"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nombre del participante"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Registrar Asistencia
          </button>
        </form>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {formType ? (
        renderForm()
      ) : (
        <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col gap-6 bg-gray-950">
          <h1 className="text-2xl font-bold text-center text-white">
            Bienvenido a Entrenamientos
          </h1>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setFormType("crear")}
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Crear Entrenamiento
              <GiTennisRacket />
            </button>
            <button
              onClick={() => setFormType("asistencia")}
              className="min-w-[180px] min-h-[55px] bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Asistencia
              <GiTennisRacket />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
