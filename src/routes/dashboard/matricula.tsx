import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/matricula')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-[800px] w-full border-2 border-gray-400 rounded-lg p-6 flex flex-col justify-evenly gap-4 gap-[0px] bg-gray-950">
          <h1 className="text-2xl font-bold text-center text-white">
            Realiza tu pago
          </h1>
          <h1 className="text-l text-left text-white mb-7 mt-5">
            Elige una membresía
          </h1>
  
          <div className="grid grid-cols-3 gap-4 gap-[50px]">
            <div className="text-left">
              <p className="text-sm text-gray-400 mb-2">
                Bronze
              </p>
              <p className='text-sm text-gray-400 mb-2'>
                Este plan incluye Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iste veritatis aut. Quidem architecto, quam qui inventore, sunt provident ipsa natus omnis at minima magnam doloribus exercitationem tempora non placeat!
              </p>
              <Link
                to="/dashboard/entrenamientos"
                className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
              >
                USD 10$
              </Link>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400 mb-2">
                Plata
              </p>
              <p className='text-sm text-gray-400 mb-2'>
                Este plan incluye Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iste veritatis aut. Quidem architecto, quam qui inventore, sunt provident ipsa natus omnis at minima magnam doloribus exercitationem tempora non placeat!
              </p>
              <Link
                to="/dashboard/torneos"
                className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
              >
                USD 20$
              </Link>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400 mb-2">
                Oro
                </p>
              <p className='text-sm text-gray-400 mb-2'>
                Este plan incluye Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iste veritatis aut. Quidem architecto, quam qui inventore, sunt provident ipsa natus omnis at minima magnam doloribus exercitationem tempora non placeat!
              </p>
              <Link
                to="/dashboard/matricula"
                className="min-w-[180px] min-h-[55px] bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-100 flex items-center justify-center gap-2"
              >
                USD 30$
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
