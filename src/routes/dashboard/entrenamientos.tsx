import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

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
            placeholder="Duracíon del entrenamiento"
            className="p-2 border rounded"
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {formType ? (
        renderForm()
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => setFormType("crear")}
            className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear Entrenamiento
          </button>
          <button
            onClick={() => setFormType("asistencia")}
            className="p-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Asistencia al Entrenamiento
          </button>
        </div>
      )}
    </div>
    
  );
}
