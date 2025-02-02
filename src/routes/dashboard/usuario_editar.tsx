import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from "@tanstack/react-query";
import { getUserByIdentification, getCurrentUser } from './../../backend/user';  // Asegúrate de importar la función correctamente
import { UserInfo, UserCreationInfo } from 'src/backend/entities'; // Importa la interfaz UserInfo

// Componente principal
export const Route = createFileRoute('/dashboard/usuario_editar')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userName, setUserName] = useState<string | null>(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    
    // Obtener el ID del usuario seleccionado desde sessionStorage
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    if (selectedUserId) {
      // Llamar a la función del backend para obtener la información del usuario
      getUserByIdentification(selectedUserId)
        .then((user) => {
          setUserInfo(user);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error al cargar la información del usuario');
          setLoading(false);
          console.error(err);
        });
    } else {
        setError('No se encontró el ID del usuario en sessionStorage');
        setLoading(false);
      }
    }, []);
  
    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Cargando información del usuario...</p>
        </div>
      );
    }
  
    // Mostrar un mensaje de error si algo falla
    if (error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
  
    // Mostrar la información del usuario si se obtiene correctamente
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="p-6 max-w-4xl w-full bg-gray-800 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-white text-center">Editar {userName || 'Usuario'}</h1>
          {userInfo ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2 text-center">Nombre</label>
                <p className="mt-1 p-2 bg-gray-500 rounded text-white text-center">{userInfo.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 text-center">Email</label>
                <p className="mt-1 p-2 bg-gray-500 rounded text-white text-center">{userInfo.identificacion}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 text-center">Teléfono</label>
                <p className="mt-1 p-2 bg-gray-500 rounded text-white text-center">{userInfo.telefono}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2 text-center">Correo</label>
                <p className="mt-1 p-2 bg-gray-500 rounded text-white text-center">{userInfo.correo}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No se encontró información de .</p>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="min-w-[200px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-xl"
              // onClick={}
            >
              Actualizar Datos
            </button>
          </div>
        </div>
      </div>
    );
  }