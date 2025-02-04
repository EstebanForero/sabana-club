import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { GiHealthIncrease, GiPerson, GiTennisRacket } from 'react-icons/gi';
import { validateNumericInput } from '../../validations/validations';
import { createTraining, deleteTraining, getAllTrainings, getUsersInTraining, registerUserInTraining } from '../../backend/training';
import { getUserByIdentification, currentUserRol } from '../../backend/user';
import { CreateRequest } from '../../backend/request';
import { useQuery } from '@tanstack/react-query'
import UserSelectionComponent from "../../components/userSelectionComponent";

// Definición de la ruta
export const Route = createFileRoute("/dashboard/entrenamientos")({
  component: RouteComponent,
});

// Componente para la ruta
function RouteComponent() {
  const [toastColor, setToastColor] = useState("");
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

  const { data: userRol } = useQuery({
    queryKey: ['this_rol'],
    queryFn: currentUserRol
  })

  const { data: users_in_training, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['user_training', selectedTraining],
    queryFn: async () => {
      if (selectedTraining) {
        const users = await getUsersInTraining(selectedTraining);
        const userDetailsPromises = users.map(user => getUserByIdentification(user.id_persona)); // Fetch user details by ID
        const userDetails = await Promise.all(userDetailsPromises);
        return userDetails; // Return the complete UserInfo objects
      }
      return [];
    },
    enabled: !!selectedTraining,
  });

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumericInput(value) && Number(value) > 0) { // Validate input
      setDuration(Number(value));
    } else {
      setDuration('');
    }
  };

  const validateTrainingName = (name: string) => {
    const regex = /^[\w\s]+$/; // Allow only alphanumeric characters and spaces
    return regex.test(name);
  };

  const handleCreateTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    if (duration === '' || duration < 0 || trainingName.trim() === '') {
      setShowToast(true);
      setToastMessage("Por favor complete todos los campos.");
      return;
    }
    if (!validateTrainingName(trainingName)) {
      setShowToast(true);
      setToastMessage("El nombre del entrenamiento contiene caracteres no permitidos.");
      return;
    }
    const trainingInfo = {
      tiempo_minutos: duration,
      nombre_entrenamiento: trainingName
    };
    await createTraining(trainingInfo);
    setShowToast(true);
    setToastMessage("Entrenamiento creado exitosamente.");
    setDuration(''); // Reset duration
    setTrainingName(""); // Reset training name
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Ocultar el toast después de 3 segundos
  };

  const handleregisterUserInTraining = async () => {
    console.log("Selected Training:", selectedTraining);
    console.log("User ID:", userId);

    if (!selectedTraining || userId.trim() === '') {
      setShowToast(true);
      setToastMessage("FALTA INFORMACION");
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
      setShowToast(true);
      setToastMessage("Error al añadir usuario al entrenamiento. Inténtalo de nuevo.");
    } finally {
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // Ocultar el toast después de 3 segundos
    }
  };

  const handledeleteTraining = async () => {
    if (formType === "asistencia") {
      // Delete the training and all users enrolled

      if (userRol == 'Admin') {
        if (selectedTraining) {
          await deleteTraining(selectedTraining);
          setShowToast(true);
          setToastMessage("Entrenamiento y usuarios eliminados exitosamente.");
        } else {
          setShowToast(true);
          setToastMessage("FALTA INFORMACION");
        }
      } else if (userRol == 'Entrenador') {
        if (selectedTraining) {
          await CreateRequest({
            type: 'DeleteTraining',
            training_id: selectedTraining
          });
          setShowToast(true);
          setToastMessage("Solicitud enviada exitosamente para borrar entrenamiento");
        } else {
          setShowToast(true);
          setToastMessage("FALTA INFORMACION");
        }
      }

    }/* else if (formType === "añadir") {
      // Remove only the selected user from the training
      if (selectedTraining && userId.trim() !== '') {
        // Logic to remove the user from the training
        // Assuming there's a function to unregister a user from training
        //await unregisterUserFromTraining(selectedTraining, userId);
        setShowToast(true);
        setToastMessage("Usuario eliminado del entrenamiento exitosamente.");
      } else {
        setShowToast(true);
        setToastMessage("FALTA INFORMACION");
      }
    }*/
  };

  const renderForm = () => {
    if (isLoading || !entrenamientos) {
      return <p>Cargando datos...</p>;
    }

    if (formType === "crear") {
      return (
        <div className="min-h-screen flex items-center justify-center w-full ">
          <form className="max-w-[2000px] w-full shadow-lg shadow-black rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-800" onSubmit={handleCreateTraining}>
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
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
            >
              Crear
            </button>
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
              onClick={() => {
                setFormType(null);
                setDuration('');
                setTrainingName('');
              }}
            >
              Regresar
            </button>
          </form>
        </div>
      );
    }

    if (formType === "asistencia") {
      return (
        <div className="max-w-[800px] w-full shadow-lg shadow-black rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-700">
          <div className="rounded-lg p-6 flex flex-col justify-evenly gap-[50px] bg-gray-800">
            <h2 className="text-xl font-bold">Formulario Asistencia</h2>
            <select
              className="p-2 border rounded max-w-full my-2"
              defaultValue=""
              onChange={(e) => {
                console.log("Training selected:", e.target.value); // Log the selected value
                setSelectedTraining(e.target.value); // Guardar el entrenamiento seleccionado
                setUserId(""); // Reset user ID when training is selected
              }}
            >
              <option value="" disabled>
                Selecciona el entrenamiento
              </option>
              {entrenamientos.map((entrenamiento) => (
                <option key={entrenamiento.id_entrenamiento} value={entrenamiento.id_entrenamiento} className="bg-gray-950 hover:cursor-pointer">
                  {entrenamiento.nombre_entrenamiento}
                </option>
              ))}
            </select>
            {users_in_training && users_in_training.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Usuarios que asisten a este Entrenamiento:</h3>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginRight: '150px' }}>
                    <h4 className="text-md font-semibold">Nombres</h4>
                    <ul>
                      {users_in_training.map((user, index) => (
                        <li key={`${user.id_persona}-${index}`}>{user.nombre}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold">Identificación</h4>
                    <ul>
                      {users_in_training.map((user, index) => (
                        <li key={`${user.id_persona}-${index}`}>{user.identificacion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <button
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
              onClick={() => handledeleteTraining()}
            >
              {userRol == 'Admin' ? "Eliminar entrenamiento" : "Enviar solicitud para eleminar entrenamiento"}
            </button>
            <button
              type="button"
              className="p-2 bg-green-500 text-white rounded hover:bg-grenn-600 hover:cursor-pointer"
              onClick={() => setFormType(null)}
            >
              Regresar
            </button>
          </div>
        </div>
      );
    }

    if (formType === "añadir") {
      return (
        <div className="max-w-[800px] w-full shadow-lg shadow-black rounded-lg p-6 flex flex-col justify-evenly gap-4 bg-gray-700">
          <div className="rounded-lg p-6 flex flex-col justify-evenly gap-[50px] bg-gray-800">
            <h2 className="text-xl font-bold">Añadir Usuario a Entrenamiento</h2>
            <select
              className="p-2 border rounded max-w-full"
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
                <option key={entrenamiento.id_entrenamiento} value={entrenamiento.id_entrenamiento} className="bg-gray-950 hover:cursor-pointer">
                  {entrenamiento.nombre_entrenamiento}
                </option>
              ))}
            </select>
            <UserSelectionComponent onChangeUser={setUserId}>
            </UserSelectionComponent>
            <button
              className="p-2 bg-yellow-500 text-white rounded hover:bg-green-800 hover:cursor-pointer"
              onClick={() => handleregisterUserInTraining()}
            >
              Añadir Usuario
            </button>
            <button
              className="p-2 bg-red-500 text-white rounded hover:bg-green-800 hover:cursor-pointer"
              onClick={handledeleteTraining}
            >
              {userRol == 'Admin' ? "Eliminar entrenamiento" : "Enviar solicitud para eleminar entrenamiento"}
            </button>
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
              onClick={() => {
                setFormType(null);
                setUserId("");
                setSelectedTraining(null); // Reset the selected training
              }}
            >
              Regresar
            </button>
          </div>
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
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 hover:cursor-pointer transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Crear Entrenamiento
              <GiTennisRacket />
            </button>
            <button
              onClick={() => setFormType("añadir")}
              className="min-w-[180px] min-h-[55px] bg-yellow-500 text-white py-2 px-4 rounded-xl hover:bg-yellow-600  hover:cursor-pointer transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Añadir Usuario a Entrenamiento
              <GiHealthIncrease />
            </button>
            <button
              onClick={() => setFormType("asistencia")}
              className="min-w-[180px] min-h-[55px] bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600  hover:cursor-pointer transition-colors duration-100 flex items-center justify-center gap-2"
            >
              ver asistencias de usuarios
              <GiPerson />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
