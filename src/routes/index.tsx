import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

// Importa las imágenes desde la carpeta assets
import imagenRegistro from "../assets/registro.jpg";
import imagenIngresar from "../assets/ingresar.jpg";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [hoveredSection, setHoveredSection] = React.useState<
    "registro" | "ingresar" | null
  >(null);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sección de Registrarse */}
      <div
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative group transition duration-200"
        style={{
          backgroundImage: `url(${imagenRegistro})`,
          filter:
            hoveredSection === "registro"
              ? "brightness(100%)"
              : hoveredSection === "ingresar"
                ? "brightness(60%)"
                : "brightness(80%)",
        }}
        onMouseEnter={() => setHoveredSection("registro")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4 text-white animate-fade-in group-hover:text-gray-100 transition duration-200">
            Únete al Sabana Club
          </h1>
          <p className="text-xl mb-8 text-gray-200 animate-fade-in delay-100 group-hover:text-gray-100 transition duration-200">
            Regístrate y forma parte de la mejor comunidad de tenis.
          </p>
          <Link to="/register">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 animate-fade-in delay-200 cursor-pointer">
              Regístrate
            </button>
          </Link>
        </div>
      </div>

      {/* Sección de Iniciar Sesión */}
      <div
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative group transition duration-200"
        style={{
          backgroundImage: `url(${imagenIngresar})`,
          filter:
            hoveredSection === "ingresar"
              ? "brightness(100%)"
              : hoveredSection === "registro"
                ? "brightness(60%)"
                : "brightness(80%)",
        }}
        onMouseEnter={() => setHoveredSection("ingresar")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4 text-white animate-fade-in group-hover:text-gray-100 transition duration-200">
            Ingresa a tu cuenta
          </h1>
          <p className="text-xl mb-8 text-gray-200 animate-fade-in delay-100 group-hover:text-gray-100 transition duration-200">
            Accede a tu perfil y reserva tu cancha.
          </p>
          <Link to="/login">
            <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold text-white hover:bg-white hover:text-blue-900 transition duration-200 animate-fade-in delay-200 cursor-pointer">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
