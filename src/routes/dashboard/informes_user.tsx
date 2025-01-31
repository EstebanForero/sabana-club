import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrainingsForUser } from './../../backend/training'; // Asegúrate de tener esta función importada
import { getUserByIdentification } from './../../backend/user'; // Usamos la función correcta para obtener el nombre del usuario por ID

export const Route = createFileRoute('/dashboard/informes_user')({
  component: RouteComponent,
});

function RouteComponent() {
  const selectedUserId = sessionStorage.getItem('selectedUserId'); // Obtener el ID del usuario desde sessionStorage
  const [userName, setUserName] = useState<string | null>(null);

  // Obtener el nombre del usuario utilizando getUserByIdentification
  useEffect(() => {
    const fetchUserName = async () => {
      if (selectedUserId) {
        const user = await getUserByIdentification(selectedUserId); // Obtenemos el usuario por ID
        setUserName(user.nombre); // Asumimos que la propiedad "nombre" está en el objeto UserInfo
      }
    };

    fetchUserName();
  }, [selectedUserId]);

  const { data: trainings, isLoading, error } = useQuery({
    queryKey: ['user_trainings', selectedUserId],
    queryFn: () => getTrainingsForUser(selectedUserId as string), // Usamos el ID del usuario para obtener los entrenamientos
    enabled: !!selectedUserId, // Solo ejecutamos la consulta si tenemos un ID de usuario
  });

  if (isLoading) return <div>Cargando entrenamientos...</div>;
  if (error) return <div>Error al cargar los entrenamientos</div>;

  const totalAsistencias = trainings?.length || 0; // El número total de entrenamientos en los que ha asistido

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-4xl w-full p-6 bg-gray-950 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Entrenamientos de {userName || 'Usuario'}
        </h1>

        {/* Verificar si el usuario tiene entrenamientos */}
        {totalAsistencias === 0 ? (
          <div className="text-center text-white py-4">
            <p>No tiene asistencias a entrenamientos actualmente.</p>
          </div>
        ) : (
          <>
            {/* Mostrar el total de asistencias dentro de una caja */}
            <div className="flex flex-col items-center py-4">
              <div className="text-white mb-2">Total de Asistencias</div>
              <div className="bg-blue-600 text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-lg">
                {totalAsistencias}
              </div>
            </div>

            {/* Tabla para mostrar la cantidad de entrenamientos */}
            <div className="overflow-x-auto mt-6">
              <table className="table-auto w-full text-white">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Entrenamientos</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings && trainings.length > 0 ? (
                    <tr>
                      <td className="px-4 py-2 text-center">{totalAsistencias}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={1} className="text-center py-2">No se encontraron entrenamientos para este usuario.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
