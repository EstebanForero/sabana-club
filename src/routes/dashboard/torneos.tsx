import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Tournament, UserSelectionInfo, UserTournamentRegistration } from './../../backend/entities';
import { createTournament, getAllTournaments, getTournamentPositions, getUsersInTournament, registerUserInTournament } from './../../backend/tournament';
import { getAllUsers } from './../../backend/user';
import UserSelectionComponent from '../../components/userSelectionComponent';
import InputComponent from '../../components/inputComponent';

export const Route = createFileRoute('/dashboard/torneos')({
  component: RouteComponent,
});

function RouteComponent() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentPlayers, setTournamentPlayers] = useState<Record<string, UserTournamentRegistration[]>>({});
  const [users, setUsers] = useState<{ id: string, nombre: string }[]>([]);
  const [newTournamentName, setNewTournamentName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');

  useEffect(() => {
    fetchTournamentsAndPlayers();
    fetchUsers(); // Obtener la lista de usuarios al cargar la página
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

  const onPositionChange = (value: string) => {
    const position = value

    if (Number(position) > 0) {
      setPlayerPosition(value)
    }
  }

  const validatePosition = async (value: string): Promise<string | undefined> => {
    try {
      const numberValue = Number(value ?? '0')

      if (numberValue < 0) {
        return "La posicion no puede ser menor o igual a cero"
      }

      if (numberValue > 99) {
        return "La posicion no puede ser mayor a 99"
      }

      const tournamentPositions = await getTournamentPositions(selectedTournamentId)

      if (tournamentPositions.includes(numberValue)) {
        return "Esta posicion ya existe en el torneo"
      }
    } catch (error) {
      return "La posicion debe ser un numero"
    }
  }

  async function fetchUsers(): Promise<void> {
    try {


      const formattedUsers = (await getAllUsers()).map(user => ({
        id: user.id_persona,
        nombre: user.nombre
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
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
    if (!selectedTournamentId || !selectedPlayerId || !playerPosition.trim()) {
      return;
    }

    const validateString = await validatePosition(playerPosition)
    if (validateString) {
      console.log('position not valid: ', validateString)
      return;
    }

    const registration: UserTournamentRegistration = {
      id_torneo: selectedTournamentId,
      id_persona: selectedPlayerId,
      puesto: Number(playerPosition.trim()),
      nombre: ''
    };

    try {
      await registerUserInTournament(registration);
      await fetchTournamentsAndPlayers(); // 🔹 Actualizar la lista de torneos y jugadores
      setSelectedTournamentId('');
      setSelectedPlayerId('');
      setPlayerPosition('0');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen space-y-6 text-gray-200">
      {/* 🔹 Sección para crear torneos */}
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Crear Torneo</h2>
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

      {/* 🔹 Sección para registrar jugadores */}
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Registrar Jugador</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-300">Torneo</label>
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
          <UserSelectionComponent onChangeUser={(user_id) => setSelectedPlayerId(user_id)} />
        </div>
        <InputComponent
          name='Posicion'
          onChange={(value) => onPositionChange(value)}
          validator={validatePosition}
          type='number'
          className='mb-6'
          disabled={!selectedTournamentId}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleRegisterPlayer}
        >
          Register
        </button>
      </div>

      {/* 🔹 Sección de torneos existentes */}
      <div className="shadow-md p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Torneos existentes</h2>
        <div className="space-y-4">
          {tournaments.map((tournament) => {
            const players = tournamentPlayers[tournament.id_torneo] || [];
            return (
              <div key={tournament.id_torneo} className="border border-gray-600 p-4 rounded">
                <h3 className="font-semibold mb-2 text-gray-200">{tournament.nombre}</h3>
                {players.length === 0 ? (
                  <p className="text-gray-400 mb-2">No hay usuarios registrados todavia</p>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="border border-gray-600 p-2 text-left text-gray-200">Nombre de el jugador</th>
                        <th className="border border-gray-600 p-2 text-left text-gray-200">Posicion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.sort((a, b) => a.puesto - b.puesto).map((player, idx) => (
                        <tr key={idx}>
                          <td className="border border-gray-600 p-2 text-gray-200">
                            {users.find(u => u.id === player.id_persona)?.nombre || "Unknown"}
                          </td>
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
