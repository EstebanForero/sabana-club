import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { FaTrophy, FaFileAlt, FaCreditCard } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent({ username = 'Usuario' }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 gap-[50px] bg-gray-950">
        <h1 className="text-2xl font-bold text-center text-white">
          Bienvenido {username}
        </h1>

        <div className="grid grid-cols-2 gap-4 gap-[50px]">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Agenda tu próximo entrenamiento
            </p>
            <Link
              to="/dashboard/entrenamientos"
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Clases
              <GiTennisRacket />
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Inscríbete en el próximo torneo
            </p>
            <Link
              to="/dashboard/torneos"
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Torneos
              <FaTrophy />
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Realiza tus pagos</p>
            <Link
              to="/dashboard/matricula"
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Pagos
              <FaCreditCard />
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Analiza tu rendimiento</p>
            <Link
              to="/dashboard/informes"
              className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
            >
              Estadísticas
              <FaFileAlt />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
