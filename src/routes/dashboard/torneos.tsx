import { createFileRoute } from '@tanstack/react-router';
import { Tournament, UserTournamentRegistration } from './../../backend/entities';
import { createTournament, getAllTournaments, getUsersInTournament, registerUserInTournament } from './../../backend/tournament';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/dashboard/torneos')({
  component: RouteComponent,
});

function RouteComponent() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentPlayers, setTournamentPlayers] = useState<
    Record<string, UserTournamentRegistration[]>
  >({});
  const [newTournamentName, setNewTournamentName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerIdentification, setPlayerIdentification] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');

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

  async function handleCreateTournament(): Promise<void> {
    if (!newTournamentName.trim()) return;
    try {
      await createTournament(newTournamentName.trim());
      setNewTournamentName('');
      await fetchTournamentsAndPlayers();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleRegisterPlayer(): Promise<void> {
    if (
      !selectedTournamentId ||
      !playerName.trim() ||
      !playerIdentification.trim() ||
      !playerPosition.trim()
    ) {
      return;
    }
    const registration: UserTournamentRegistration = {
      id_torneo: selectedTournamentId,
      id_persona: playerIdentification.trim(),
      puesto: Number(playerPosition.trim()),
    };
    try {
      await registerUserInTournament(registration);
      const updatedPlayers = await getUsersInTournament(selectedTournamentId);
      setTournamentPlayers((prev) => ({
        ...prev,
        [selectedTournamentId]: updatedPlayers,
      }));
      setSelectedTournamentId('');
      setPlayerName('');
      setPlayerIdentification('');
      setPlayerPosition('');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen space-y-6 text-gray-200">
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Create Tournament</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tournament Name"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            value={newTournamentName}
            onChange={(e) => setNewTournamentName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCreateTournament}
          >
            Create
          </button>
        </div>
      </div>
  
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Register Player</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Tournament</label>
          <select
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            value={selectedTournamentId}
            onChange={(e) => setSelectedTournamentId(e.target.value)}
          >
            <option value="">Select a tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament.id_torneo} value={tournament.id_torneo}>
                {tournament.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Player Name</label>
          <input
            type="text"
            placeholder="Player Name"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Identification</label>
          <input
            type="text"
            placeholder="Player Identification"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            value={playerIdentification}
            onChange={(e) => setPlayerIdentification(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Position</label>
          <input
            type="text"
            placeholder="Position"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            value={playerPosition}
            onChange={(e) => setPlayerPosition(e.target.value)}
          />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleRegisterPlayer}
        >
          Register
        </button>
      </div>
  
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Existing Tournaments</h2>
        <div className="space-y-4">
          {tournaments.map((tournament) => {
            const players = tournamentPlayers[tournament.id_torneo] || [];
            return (
              <div key={tournament.id_torneo} className="border border-gray-600 p-4 rounded">
                <h3 className="font-semibold mb-2 text-gray-200">{tournament.nombre}</h3>
                {players.length === 0 ? (
                  <p className="text-gray-400 mb-2">No players registered yet.</p>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="border border-gray-600 p-2 text-left text-gray-200">Id torneo</th>
                        <th className="border border-gray-600 p-2 text-left text-gray-200">Identification</th>
                        <th className="border border-gray-600 p-2 text-left text-gray-200">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-600 p-2 text-gray-200">{player.id_torneo}</td>
                          <td className="border border-gray-600 p-2 text-gray-200">{player.id_persona}</td>
                          <td className="border border-gray-600 p-2 text-gray-200">{player.puesto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
}
