import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { registerUser } from '../backend/auth';
import InputComponent from '../components/inputComponent';

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [idType, setIdType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate({ from: '/login' })

  const onRegister = () => {
    registerUser({
      identificacion: id,
      telefono: Number(phone),
      correo: email,
      contrasena: password,
      nombre: nombreUsuario,
      nombre_tipo_identificacion: idType
    })
      .then(() => navigate({ to: '/login' }))
      .catch(e => console.log("Error registering user: ", e));
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
              className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona tu tipo de identificación</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="ce">Cédula de Extranjería</option>
              <option value="passport">Pasaporte</option>
            </select>
          </div>

          <div className="grid grid-cols-[1fr_200px_1fr] gap-4">
            <InputComponent
              name="Identificación"
              placeholder="Ingresa tu Identificación"
              type="text"
              // validator={validateId}
              onChange={setId}
            />

            <InputComponent
              name="Nombre de Usuario"
              placeholder="Ingresa tu nombre de usuario"
              type="text"
              // validator={validateRequired}
              onChange={setNombreUsuario}
            />
          </div>

          <div className="grid grid-cols-[1fr_200px_1fr] gap-4">
            <InputComponent
              name="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              type="email"
              // validator={validateEmail}
              onChange={setEmail}
            />

            <InputComponent
              name="Teléfono"
              placeholder="Ingresa tu número de teléfono"
              type="tel"
              // validator={validatePhone}
              onChange={setPhone}
            />
          </div>

          <div className="grid grid-cols-[1fr_200px_1fr] gap-4">
            <InputComponent
              name="Contraseña"
              placeholder="Crea una contraseña"
              type="password"
              // validator={validatePassword}
              onChange={setPassword}
            />

            <InputComponent
              name="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              type="password"
              // validator={(val) => validateConfirmPassword(val, password)}
              onChange={setConfirmPassword}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={onRegister}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              Registrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RouteComponent;

