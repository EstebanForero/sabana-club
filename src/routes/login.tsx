import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogInInfo, logInUser } from "../backend/auth";
import { useState } from "react";
import { saveToken } from "./../stores/token_store";
import InputComponent from "../components/inputComponent";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [logInInfo, setLogInInfo] = useState<LogInInfo>({
    identificacion: "",
    contrasena: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate({ from: '/login' });

  const onLogIn = async () => {
    setErrorMessage(null);

    if (!logInInfo.identificacion.trim()) {
      setErrorMessage("El identificador es requerido.");
      return;
    }
    if (!logInInfo.contrasena.trim()) {
      setErrorMessage("La contraseña es requerida.");
      return;
    }

    try {
      const token = await logInUser(logInInfo);
      saveToken(token);
      navigate({ to: '/user_dashboard' });
    } catch (error) {
      console.log("Error logging user");
      setErrorMessage(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Iniciar Sesión
        </h2>
        <div className="grid gap-6">
          <InputComponent
            name="Correo Electrónico o Teléfono"
            placeholder="Ingresa tu correo electrónico o teléfono"
            type="text"
            validator={(value) => {
              if (!value.trim()) return "El identificador es requerido.";
            }}
            onChange={(value) =>
              setLogInInfo({ ...logInInfo, identificacion: value })
            }
          />

          <InputComponent
            name="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            validator={(value) => {
              if (!value.trim()) return "La contraseña es requerida.";
            }}
            onChange={(value) =>
              setLogInInfo({ ...logInInfo, contrasena: value })
            }
          />

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              onClick={onLogIn}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


