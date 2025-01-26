import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/torneos')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 bg-gray-100 space-y-6">
      <div className="shadow-md p-4 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create Tournament</h2>
        <div className="flex space-x-4">
          <input 
            type="text" 
            placeholder="Tournament Name" 
            className="w-full p-2 border rounded text-gray-800" 
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>

      <div className="shadow-md p-4 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Register Player</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Tournament</label>
          <select className="w-full p-2 border rounded text-gray-800">
            <option value="">Select a tournament</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Player Name</label>
          <input 
            type="text" 
            placeholder="Player Name" 
            className="w-full p-2 border rounded text-gray-800" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Identification</label>
          <input 
            type="text" 
            placeholder="Player Identification" 
            className="w-full p-2 border rounded text-gray-800" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Score</label>
          <input 
            type="text" 
            placeholder="Score" 
            className="w-full p-2 border rounded text-gray-800" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Position</label>
          <input 
            type="text" 
            placeholder="Position" 
            className="w-full p-2 border rounded text-gray-800" 
          />
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Register
        </button>
      </div>

      <div className="shadow-md p-4 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Tournaments</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-800">Tournament Name</h3>
            <p className="text-gray-700 mb-2">No players registered yet.</p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left text-gray-800">Player Name</th>
                  <th className="border p-2 text-left text-gray-800">Identification</th>
                  <th className="border p-2 text-left text-gray-800">Score</th>
                  <th className="border p-2 text-left text-gray-800">Position</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic rows will be added here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
