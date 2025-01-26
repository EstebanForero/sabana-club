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

  </div>
}
