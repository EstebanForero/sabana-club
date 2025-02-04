import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Tournament, UserTournamentRegistration } from './../../backend/entities';
import { getAllTournaments, getUsersInTournament, deleteTournament } from './../../backend/tournament';
import { currentUserRol } from './../../backend/user';

export const Route = createFileRoute('/dashboard/informes_Torneos')({
  component: RouteComponent,
});

function RouteComponent() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentPlayers, setTournamentPlayers] = useState<Record<string, UserTournamentRegistration[]>>({});
  const [userRol, setUserRol] = useState<string>(''); // Agregado para obtener el rol del usuario

  useEffect(() => {
    fetchTournamentsAndPlayers();
  }, []);

  async function fetchTournamentsAndPlayers(): Promise<void> {
    try {
      const allTournaments = await getAllTournaments();
      setTournaments(allTournaments);
      const playersMap: Record<string, UserTournamentRegistration[]> = {};

      for (const t of allTournaments) {
        const players = await getUsersInTournament(t.id_torneo);
        playersMap[t.id_torneo] = players;
      }

      setTournamentPlayers(playersMap);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onDeleteTournament = async (tournament_id: string) => {
    if (userRol === 'Admin') {
      await deleteTournament(tournament_id);
      fetchTournamentsAndPlayers(); // Re-fetch to update the tournament list
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen space-y-6 text-gray-200">
      <div className="shadow-md p-6 rounded-lg bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Torneos Existentes</h2>

        {/* Mostrar la cantidad de torneos existentes */}
        <div className="text-center text-lg mb-6 text-gray-300">
          <strong>Cantidad de Torneos: </strong>
          <span className="w-16 h-8 bg-gray-600 text-center text-white font-semibold rounded-lg inline-flex items-center justify-center">
            {tournaments.length}
          </span>
        </div>

        <div className="space-y-6">
          {tournaments.map((tournament) => {
            const players = tournamentPlayers[tournament.id_torneo] || [];
            return (
              <div key={tournament.id_torneo} className="border border-gray-700 p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
                <div className="flex flex-row justify-between mb-6 items-center">
                  <h3 className="text-xl font-semibold text-gray-200">{tournament.nombre}</h3>
                  <button
                    className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => onDeleteTournament(tournament.id_torneo)}
                  >
                    {userRol === 'Admin' ? 'Eliminar Torneo' : 'Solicitar Eliminación'}
                  </button>
                </div>
                {players.length === 0 ? (
                  <p className="text-gray-400 mb-2">No hay usuarios registrados todavía</p>
                ) : (
                  <div className="flex items-center justify-between mb-4">
                    <strong className="text-gray-200">Cantidad de Participantes: </strong>
                    <div className="w-16 h-8 bg-gray-600 text-center text-white font-semibold rounded-lg flex items-center justify-center">
                      {players.length}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
