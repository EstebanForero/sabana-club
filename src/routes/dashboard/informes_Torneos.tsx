import { createFileRoute } from '@tanstack/react-router'
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
    if (userRol == 'Admin') {
      await deleteTournament(tournament_id);
      fetchTournamentsAndPlayers(); // Re-fetch to update the tournament list
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen space-y-6 text-gray-200">
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Torneos existentes</h2>
        <div className="space-y-4">
          {tournaments.map((tournament) => {
            const players = tournamentPlayers[tournament.id_torneo] || [];
            return (
              <div key={tournament.id_torneo} className="border border-gray-600 p-4 rounded">
                <div className="flex flex-row justify-between mb-4 items-center">
                  <h3 className="font-semibold mb-2 text-gray-200">{tournament.nombre}</h3>
                  <button 
                    className="bg-red-500 px-2 py-1 cursor-pointer rounded-sm hover:bg-red-600"
                    onClick={() => onDeleteTournament(tournament.id_torneo)}
                  >
                    {userRol === "Admin" ? "Delete tournament" : "Send delete tournament request"}
                  </button>
                </div>
                {players.length === 0 ? (
                  <p className="text-gray-400 mb-2">No hay usuarios registrados todavía</p>
                ) : (
                  <div className="text-gray-200 mb-2">
                    <strong>Cantidad de Participantes: </strong>
                    {players.length}
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
