import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

// Importa las imágenes
import imagenRegistro from "../assets/registro.jpg";
import imagenIngresar from "../assets/ingresar.jpg";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [hoveredSection, setHoveredSection] = React.useState<
    "registro" | "ingresar" | null
  >(null);

  // Funcion para calcular el filtro de brillo
  const getBrightnessFilter = (
    section: "registro" | "ingresar" | null,
    targetSection: "registro" | "ingresar"
  ) => {
    if (section === targetSection) return "brightness(100%)";
    if (section) return "brightness(50%)";
    return "brightness(75%)";
  };

  // Clases reutilizables
  const buttonClasses =
    "px-6 py-3 rounded-lg font-semibold transition duration-300 animate-fade-in delay-200";
  const titleClasses =
    "text-4xl md:text-6xl font-bold mb-4 text-white text-center animate-fade-in group-hover:text-gray-100 transition duration-300";
  const descriptionClasses =
    "text-lg md:text-xl mb-8 text-center text-gray-200 animate-fade-in delay-100 group-hover:text-gray-100 transition duration-300";

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sección de Registrarse */}
      <div
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative group transition duration-300"
        style={{
          backgroundImage: `url(${imagenRegistro})`,
          filter: getBrightnessFilter(hoveredSection, "registro"),
        }}
        onMouseEnter={() => setHoveredSection("registro")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>

        <div className="relative z-10">
          <h1 className={titleClasses}>Únete al Club Sabana</h1>
          <p className={descriptionClasses}>
            Regístrate y forma parte del mejor club de tenis.
          </p>
          <Link to="/register">
            <button
              className={`bg-white text-blue-900 hover:bg-gray-100 ${buttonClasses}`}
              aria-label="Regístrate en el Club Sabana"
            >
              Regístrate
            </button>
          </Link>
        </div>
      </div>

      {/* Sección de Iniciar Sesión */}
      <div
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative group transition duration-300"
        style={{
          backgroundImage: `url(${imagenIngresar})`,
          filter: getBrightnessFilter(hoveredSection, "ingresar"),
        }}
        onMouseEnter={() => setHoveredSection("ingresar")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>

        <div className="relative z-10">
          <h1 className={titleClasses}>Ingresa a tu cuenta</h1>
          <p className={descriptionClasses}>
            Accede a tu perfil y entra a la cancha.
          </p>
          <Link to="/login">
            <button
              className={`bg-transparent border border-white text-white hover:bg-white hover:text-blue-900 ${buttonClasses}`}
              aria-label="Iniciar sesión en el Club Sabana"
            >
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
