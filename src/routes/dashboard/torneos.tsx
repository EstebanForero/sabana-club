import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/torneos')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <div className="p-4 bg-gray-100 space-y-6">
  <div className="shadow-md p-4 rounded-lg bg-white">
    <h2 className="text-xl font-bold mb-4">Create Tournament</h2>
    <div className="flex space-x-4">
      <input 
        type="text" 
        placeholder="Tournament Name" 
        className="w-full p-2 border rounded" 
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create
      </button>
    </div>
  </div>
  <div className="shadow-md p-4 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Register Player</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tournament</label>
          <select className="w-full p-2 border rounded">
            <option value="">Select a tournament</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Player Name</label>
          <input 
            type="text" 
            placeholder="Player Name" 
            className="w-full p-2 border rounded" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Identification</label>
          <input 
            type="text" 
            placeholder="Player Identification" 
            className="w-full p-2 border rounded" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Score</label>
          <input 
            type="text" 
            placeholder="Score" 
            className="w-full p-2 border rounded" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Position</label>
          <input 
            type="text" 
            placeholder="Position" 
            className="w-full p-2 border rounded" 
          />
        </div>


  </div>

  </div>
}
