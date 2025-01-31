import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from './../../backend/user'; // Asumiendo que la función getCurrentUser existe
import UserSelectionComponent from './../../components/userSelectionComponent'; // Componente para seleccionar un usuario

export const Route = createFileRoute('/dashboard/informes')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: thisUserData } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  });

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Esta función se ejecuta cuando un usuario es seleccionado en el componente UserSelectionComponent
  const onUserSelect = (user_id: string) => {
    setSelectedUserId(user_id); // Guardamos el ID del usuario seleccionado
    setErrorMessage(null); // Limpiamos cualquier mensaje de error previo
  };

  // Función para manejar el botón de "Buscar"
  const onSearchUser = () => {
    if (!selectedUserId) {
      setErrorMessage('Por favor selecciona un usuario');
      return;
    }

    // Guardamos el ID del usuario seleccionado en el sessionStorage
    sessionStorage.setItem('selectedUserId', selectedUserId);

    // Si un usuario ha sido seleccionado, redirigimos a la página de informes del usuario
    navigate({to: '/dashboard/informes_user'});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-8 flex flex-col justify-evenly gap-8 bg-gray-950">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Bienvenido {thisUserData?.nombre}
        </h1>

        {/* Componente para seleccionar un usuario */}
        <UserSelectionComponent onChangeUser={onUserSelect} />

        {/* Mostrar mensaje de error si no se encuentra el usuario o hay algún problema */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        {/* Botón de búsqueda */}
        <div className="flex justify-center">
          <button
            onClick={onSearchUser}
            className="min-w-[200px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-xl"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
