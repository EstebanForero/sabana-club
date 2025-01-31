import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { GiTennisRacket } from 'react-icons/gi';
import { validateNumericInput } from '../../validations/validations';
import { createTraining, getAllTrainings, getUsersInTraining, registerUserInTraining } from '../../backend/training'; 
import { useQuery } from '@tanstack/react-query'
import UserSelectionComponent from "../../components/userSelectionComponent";

// Definición de la ruta
export const Route = createFileRoute("/dashboard/entrenamientos")({
  component: RouteComponent,
});

// Componente para la ruta
function RouteComponent() {
  const [formType, setFormType] = useState<"crear" | "asistencia" | "añadir" | null>(null);
  const [duration, setDuration] = useState<number | ''>(''); // State for duration
  const [trainingName, setTrainingName] = useState("");
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [showToast, setShowToast] = useState<boolean>(false); // Estado para mostrar toast
  const [toastMessage, setToastMessage] = useState<string>(""); // Mensaje del toast
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>(""); // State for user ID

  const { data: entrenamientos, isLoading } = useQuery({
    queryKey: ['all_trainings'],
    queryFn: getAllTrainings
  });
  
  const { data: users_in_training, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['user_training', selectedTraining], // La clave depende del entrenamiento seleccionado
    queryFn: () => selectedTraining ? getUsersInTraining(selectedTraining) : [], // Ejecutar solo si hay un entrenamiento seleccionado
    enabled: !!selectedTraining, // Solo activar la consulta cuando haya un entrenamiento seleccionado
  });

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumericInput(value) && Number(value) >= 0) { // Validate input
      setDuration(Number(value));
    } else {
      setDuration('');
    }
  };

  const handleCreateTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    if (duration === '' || duration < 0 || trainingName.trim() === '') {
      console.error("duracíon invalida o nombre de entrenamiento vacío");
      return;
    }
    const trainingInfo = {
      tiempo_minutos: duration,
      nombre_entrenamiento: trainingName
    };
    await createTraining(trainingInfo);
    setShowToast(true);
    setToastMessage("Entrenamiento creado exitosamente.");
    setDuration('');
    setTrainingName("");
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Ocultar el toast después de 3 segundos
  };

  const handleregisterUserInTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Training:", selectedTraining);
    console.log("User ID:", userId);
    
    if (!selectedTraining || userId.trim() === '') {
      console.error("Entrenamiento no seleccionado o ID de usuario vacío");
      return;
    }
    const TrainingRegistration = {
      id_entrenamiento: selectedTraining,
      id_persona: userId
    };
    try {
      await registerUserInTraining(TrainingRegistration);
      setShowToast(true);
      setToastMessage("Usuario añadido al entrenamiento exitosamente.");
    } catch (error) {
      console.error("Error al añadir usuario al entrenamiento:", error);
      setShowToast(true);
      setToastMessage("Error al añadir usuario al entrenamiento. Inténtalo de nuevo.");
    } finally {
      setUserId("");
      setSelectedTraining(null);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // Ocultar el toast después de 3 segundos
    }
  };

  const renderForm = () => {
    if (isLoading || !entrenamientos ) {
      return <p>Cargando datos...</p>;
    }

    if (formType === "crear") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <form className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-950" onSubmit={handleCreateTraining}>
            <h2 className="text-xl font-bold">Formulario Crear Entrenamiento</h2>
            <input
              type="text"
              placeholder="Nombre del entrenamiento"
              className="p-2 border rounded"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duracíon entrenamiento en minutos"
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
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setFormType(null)}
            >
              Regresar
            </button>
          </form>
        </div>
      );
    }

    if (formType === "asistencia") {
      return (
        <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-950">
          <form className="rounded-lg p-6 flex flex-col justify-evenly gap-[50px] bg-gray-950">
            <h2 className="text-xl font-bold">Formulario Asistencia</h2>
            <select
              className="p-2 border rounded"
              defaultValue=""
              onChange={(e) => {
                console.log("Training selected:", e.target.value); // Log the selected value
                setSelectedTraining(e.target.value); // Guardar el entrenamiento seleccionado
              }}
            >
              <option value="" disabled>
                Selecciona el entrenamiento
              </option>
              {entrenamientos.map((entrenamiento) => (
                <option key={entrenamiento.id_entrenamiento} value={entrenamiento.id_entrenamiento} className="bg-gray-950">
                  {entrenamiento.nombre_entrenamiento}
                </option>
              ))}
            </select>
            {users_in_training && users_in_training.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Usuarios en el Entrenamiento:</h3>
                <ul>
                  {users_in_training.map(user => (
                    <li key={user.id_persona} value={user.id_persona} className="p-2 border-b">
                      {user.id_persona} (ID: {user.id_persona})</li> // Updated to show name and ID
                  ))}
                </ul>
              </div>
            )}
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setFormType(null)}
            >
              Regresar
            </button>
          </form>
        </div>
      );
    }

    if (formType === "añadir") {
      return (
        <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-950">
          <form className="rounded-lg p-6 flex flex-col justify-evenly gap-[50px] bg-gray-950" onSubmit={handleregisterUserInTraining}>
            <h2 className="text-xl font-bold">Añadir Usuario a Entrenamiento</h2>
            <select
              className="p-2 border rounded"
              defaultValue=""
              onChange={(e) => {
                console.log("Training selected:", e.target.value); // Log the selected value
                setSelectedTraining(e.target.value); // Guardar el entrenamiento seleccionado
              }}
            >
              <option value="" disabled>
                Selecciona el entrenamiento
              </option>
              {entrenamientos.map((entrenamiento) => (
                <option key={entrenamiento.id_entrenamiento} value={entrenamiento.id_entrenamiento} className="bg-gray-950">
                  {entrenamiento.nombre_entrenamiento}
                </option>
              ))}
            </select>
            <UserSelectionComponent onChangeUser={setUserId}>
              
            </UserSelectionComponent>
            <button
              type="submit"
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Añadir Usuario
            </button>
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setFormType(null)}
            >
              Regresar
            </button>
          </form>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {formType ? (
        <>
          {renderForm()}
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-info">
                <span>{toastMessage}</span>
              </div>
            </div>
          )}
        </>
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
              onClick={() => setFormType("añadir")}
              className="min-w-[180px] min-h-[55px] bg-yellow-500 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Añadir Usuario a Entrenamiento
              <GiTennisRacket />
            </button>
            <button
              onClick={() => setFormType("asistencia")}
              className="min-w-[180px] min-h-[55px] bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              ver asistencias de usuarios
              <GiTennisRacket />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
