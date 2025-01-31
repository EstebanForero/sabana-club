import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from './../../backend/user'; // Asumiendo que la función getCurrentUser existe

export const Route = createFileRoute('/dashboard/informes')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: thisUserData } = useQuery({
    queryKey: ['this_user'],
    queryFn: getCurrentUser
  });

  // Estado para manejar el nombre que el usuario desea buscar
  const [searchName, setSearchName] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 gap-[50px] bg-gray-950">
        <h1 className="text-2xl font-bold text-center text-white mb-0.1">
          Bienvenido {thisUserData?.nombre}
        </h1>
        {/* Caja para buscar un usuario */}
        <div className="text-center">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Nombre de usuario"
            className="min-w-[300px] min-h-[40px] p-2 rounded-lg bg-gray-800 text-white border-2 border-gray-400 mb-4"
          />

          {/* Contenedor flex para el botón centrado */}
          <div className="flex justify-center">
            <button
              onClick={() => console.log(`Buscando a: ${searchName}`)}
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 text-2xl"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
