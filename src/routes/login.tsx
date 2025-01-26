import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [identifier, setIdentifier] = useState<string>(""); // Aquí guardamos el valor del input de identificación, tanto correo como telefono
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui llamar funcion de backend
    console.log("Datos enviados:", { identifier, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="identifier"
                className="text-sm text-gray-300 mb-2"
              >
                Correo Electrónico o Teléfono
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu correo electrónico o teléfono"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
