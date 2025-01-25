import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const [action, setAction] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Únete a Club Sabana
        </h2>
        <form>
          <div className="grid gap-7">
            <div className="grid grid-cols-[1fr_200px_1fr] gap-5">
              <div className="flex flex-col">
                <label htmlFor="id" className="text-sm text-gray-300 mb-2">
                  ID
                </label>
                <input
                  id="id"
                  type="text"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu ID"
                  required
                />
              </div>

              <div className="flex flex-col col-start-3">
                <label
                  htmlFor="username"
                  className="text-sm text-gray-300 mb-2"
                >
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu nombre de usuario"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_200px_1fr] gap-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>

              <div className="flex flex-col col-start-3">
                <label htmlFor="phone" className="text-sm text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu número de teléfono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_200px_1fr] gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-300 mb-2"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Crea una contraseña"
                  required
                />
              </div>

              <div className="flex flex-col col-start-3">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-300 mb-2"
                >
                  Confirmar Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Crea una contraseña"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
