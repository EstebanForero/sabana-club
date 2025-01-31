import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrainingsForUser } from './../../backend/training'; // Asegúrate de tener esta función importada
import { getUserByIdentification } from './../../backend/user'; // Usamos la función correcta para obtener el nombre del usuario por ID
import { getAllTournaments, getTournamentByUser } from './../../backend/tournament'; // Funciones para torneos
import { CircularProgressbar } from 'react-circular-progressbar'; // Importamos la rueda de progreso
import 'react-circular-progressbar/dist/styles.css'; // Estilos de la rueda
import { FaTrophy } from 'react-icons/fa'; // Importamos los íconos de react-icons

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

    const navigate = useNavigate();

    const onSearchUser = () => {
        // Si un usuario ha sido seleccionado, redirigimos a la página de informes del usuario
        navigate({to: '/dashboard/informes'});
    };

  // Consultas para obtener los datos de entrenamientos y torneos
    const { data: trainings, isLoading: isLoadingTrainings } = useQuery({
    queryKey: ['user_trainings', selectedUserId],
    queryFn: () => getTrainingsForUser(selectedUserId as string),
    enabled: !!selectedUserId,
    });

    const { data: allTournaments, isLoading: isLoadingTournaments } = useQuery({
    queryKey: ['all_tournaments'],
    queryFn: getAllTournaments,
    });

    const { data: userTournaments, isLoading: isLoadingUserTournaments } = useQuery({
    queryKey: ['user_tournaments', selectedUserId],
    queryFn: () => getTournamentByUser(selectedUserId as string),
    enabled: !!selectedUserId,
    });

    if (isLoadingTrainings || isLoadingTournaments || isLoadingUserTournaments)
    return <div>Cargando información...</div>;

  const totalTrainings = trainings?.length || 0; // Total de entrenamientos
  const totalTournaments = allTournaments?.length || 0; // Total de torneos
  const userParticipatingTournaments = userTournaments?.length || 0; // Torneos en los que está participando el usuario

  // Calcular el porcentaje de participación en torneos
    const participationPercentage =
    totalTournaments > 0 ? (userParticipatingTournaments / totalTournaments) * 100 : 0;

  // Calcular el promedio de puestos en los torneos
    const totalPuestos = userTournaments?.reduce((acc, tournament) => acc + tournament.puesto, 0) || 0;
    const promedioPuesto = userParticipatingTournaments > 0 ? Math.round(totalPuestos / userParticipatingTournaments) : 0;

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="max-w-4xl w-full p-6 bg-gray-950 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
            Informes de {userName || 'Usuario'}
        </h1>

        {/* Caja contenedora de Entrenamientos, Torneos y puesto*/}
        <div className="flex justify-between gap-8">
          {/* Sección de Entrenamientos */}
            <div className="flex-1 bg-blue-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Entrenamientos</h2>

            {/* Verificar si el usuario tiene entrenamientos */}
            {totalTrainings === 0 ? (
                <div className="text-center text-white py-4">
                <p>No tiene asistencias a entrenamientos actualmente.</p>
                </div>
            ) : (
                <>
                {/* Mostrar el total de asistencias dentro de una caja */}
                <div className="flex flex-col items-center py-4">
                    <div className="text-white mb-2 text-center">Total de Asistencias a Entrenamientos</div>
                    <div className="bg-blue-600 text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-lg">
                    {totalTrainings}
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
                            <td className="px-4 py-2 text-center">{totalTrainings}</td>
                        </tr>
                        ) : (
                        <tr>
                            <td colSpan={1} className="text-center py-2">
                            No se encontraron entrenamientos para este usuario.
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </>
            )}
            </div>
          {/* Sección de Torneos */}
            <div className="flex-1 bg-green-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Torneos</h2>
            {/* Verificar si el usuario está participando en torneos */}
            {userParticipatingTournaments === 0 ? (
                <div className="text-center text-white py-4">
                <p>No está participando en torneos actualmente.</p>
                </div>
            ) : (
                <>
                {/* Mostrar la rueda de porcentaje */}
                <div className="flex flex-col items-center py-4">
                    <div className="text-white mb-2 text-center">Porcentaje de Participación en Torneos</div>
                    <div className="w-24 h-24">
                    <CircularProgressbar
                        value={participationPercentage}
                        text={`${participationPercentage.toFixed(2)}%`}
                        styles={{
                        path: {
                            stroke: participationPercentage < 50 ? '#FF6347' : participationPercentage < 80 ? '#FFD700' : '#32CD32',
                            strokeWidth: 10,
                        },
                        trail: {
                            stroke: '#2d2d2d',
                        },
                        text: {
                            fill: '#fff',
                            fontSize: '16px',
                        },
                        }}
                    />
                    </div>
                </div>
                {/* Tabla para mostrar la cantidad de torneos en los que participa */}
                <div className="overflow-x-auto mt-6">
                    <table className="table-auto w-full text-white">
                    <thead>
                        <tr className="border-b">
                        <th className="px-4 py-2">Torneos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTournaments && userTournaments.length > 0 ? (
                        <tr>
                            <td className="px-4 py-2 text-center">{userParticipatingTournaments}</td>
                        </tr>
                        ) : (
                        <tr>
                            <td colSpan={1} className="text-center py-2">
                            No se encontraron torneos para este usuario.
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </>
            )}
            </div>
          {/* Sección del Promedio de Puesto */}
            <div className="flex-1 bg-yellow-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Puesto Promedio</h2>
            {/* Mostrar el promedio de puesto en los torneos */}
            <div className="flex flex-col items-center py-4">
                <div className="bg-yellow-600 text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-lg">
                {promedioPuesto > 0 ? promedioPuesto : 'No tiene puestos'}
                </div>
            </div>
            {/* Mostrar íconos de copas para el puesto */}
            <div className="mt-6">
                {userTournaments && userTournaments.length > 0 &&
                userTournaments.map((tournament, index) => (
                    <div key={index} className="flex flex-col items-center py-4">
                    {tournament.puesto === 1 ? (
                        <FaTrophy className="text-yellow-500 text-4xl animate-pulse" />
                    ) : tournament.puesto === 2 ? (
                        <FaTrophy className="text-gray-400 text-4xl animate-pulse" />
                    ) : tournament.puesto === 3 ? (
                        <FaTrophy className="text-orange-400 text-4xl animate-pulse" />
                    ) : (
                        <div className="bg-gray-600 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg">
                        Puesto: {tournament.puesto}
                        </div>
                    )}
                    </div>
                ))}
            </div>
            </div>
            
        </div>
             {/* Espacio entre los contenedores y el botón */}
             <div className="flex justify-center mt-8"> {/* Aquí agregamos mt-8 */}
            <button
                onClick={onSearchUser}
                className="min-w-[200px] min-h-[55px] bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-xl"
            >
                Atras
            </button>
        </div>
        </div>
    </div>
    );
}
