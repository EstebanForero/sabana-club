import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  handleNumericChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
} from "../validations/validations";
import { registerUser } from "./../backend/auth";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [id, setId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [idType, setIdType] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigate = useNavigate({ from: '/login' })

  const onRegister = () => {
    console.log("register user is executing")
    registerUser({
      identificacion: id,
      telefono: Number(phone),
      correo: email,
      contrasena: password,
      nombre: nombreUsuario,
      nombre_tipo_identificacion: idType
    }).then(() => navigate({ to: '/login' })).catch(e => console.log("Error registering user: ", e));
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Únete a Club Sabana
        </h2>
        <div className="grid gap-3">
          <div className="flex flex-col">
            <label htmlFor="idType" className="text-sm text-gray-300 mb-2">
              Tipo de Identificación
            </label>
            <select
              id="idType"
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona tu tipo de identificación</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="ce">Cédula de Extranjería</option>
              <option value="passport">Pasaporte</option>
            </select>
          </div>
          <div className="grid grid-cols-[1fr_200px_1fr] ">
            <div className="flex flex-col">
              <label htmlFor="id" className="text-sm text-gray-300 mb-2">
                Identificación
              </label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => handleNumericChange(e, setId, setPhone)}
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu Identificación"
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
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_200px_1fr] ">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  handleEmailChange(e, setEmail, setEmailError)
                }
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu correo electrónico"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <div className="flex flex-col col-start-3">
              <label htmlFor="phone" className="text-sm text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => handleNumericChange(e, setId, setPhone)}
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu número de teléfono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_200px_1fr] ">
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
                value={password}
                onChange={(e) =>
                  handlePasswordChange(e, setPassword, setPasswordError)
                }
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Crea una contraseña"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <div className="flex flex-col col-start-3">
              <label
                htmlFor="password"
                className="text-sm text-gray-300 mb-2"
              >
                Confirmar Contraseña
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleConfirmPasswordChange(
                    e,
                    password,
                    setConfirmPassword,
                    setConfirmPasswordError
                  )
                }
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirma tu contraseña"
                required
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => onRegister()}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
