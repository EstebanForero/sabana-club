import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "../backend/auth";
import { UserCreationInfo } from "backend/entities";

import {
  handleNumericChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
} from "../validations/validations";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [identificador, setIdentificador] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [password, setContrasena] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [idType, setIdType] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [userCreationInfo, setUserCreationInfo] = useState<UserCreationInfo>({
    nombre: "",
    contrasena: "",
    correo: "",
    telefono: "",
    identificacion: "",
    nombre_tipo_identificacion: "",
  });

  const onRegister = async (userCreationInfo: UserCreationInfo) => {
    try {
      await registerUser(userCreationInfo);
      redirect({ to: "/login" });
    } catch (error) {
      console.log("error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Únete a Club Sabana
        </h2>
        <form>
          <div className="grid gap-3">
            <div className="flex flex-col">
              <label htmlFor="idType" className="text-sm text-gray-300 mb-2">
                Tipo de Identificación
              </label>
              <select
                id="idType"
                value={userCreationInfo.nombre_tipo_identificacion}
                onChange={(e) =>
                  setUserCreationInfo({
                    ...userCreationInfo,
                    nombre_tipo_identificacion: e.target.value,
                  })
                }
                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecciona tu tipo de identificación</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="flex flex-col">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="flex flex-col">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
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
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => onRegister(userCreationInfo)}
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
