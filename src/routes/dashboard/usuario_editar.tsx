import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getUserByIdentification, updateUser } from './../../backend/user'; // Asegúrate de importar la función correctamente
import { UserInfo, UserUpdationInfo } from 'src/backend/entities'; // Importa la interfaz UserInfo
import UserForm from '../../components/userForm';

// Componente principal
export const Route = createFileRoute('/dashboard/usuario_editar')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSearchUser = () => {
    // Si un usuario ha sido seleccionado, redirigimos a la página de informes del usuario
    navigate({ to: '/dashboard/usuarios' });
  };

  const [errorMessage, setErrorMessage] = useState('')
  const [succesfullMessage, setSuccesfullMessage] = useState('')

  const showToast = (variant: 'succesfull' | 'error', message: string) => {
    if (variant == 'succesfull') {
      setSuccesfullMessage(message)
      setTimeout(() => setSuccesfullMessage(''), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  useEffect(() => {
    // Obtener el ID del usuario seleccionado desde sessionStorage
    const selectedUserId = sessionStorage.getItem('selectedUserId');
    if (selectedUserId) {
      // Llamar a la función del backend para obtener la información del usuario
      getUserByIdentification(selectedUserId)
        .then((user) => {
          setUserInfo(user);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error al cargar la información del usuario');
          setLoading(false);
          console.error(err);
        });
    } else {
      setError('No se encontró el ID del usuario en sessionStorage');
      setLoading(false);
    }
  }, []);

  if (!userInfo) {
    return <span className="loading loading-spinner loading-xl"></span>
  }

  const updateUserAdmin = async (userUpdateInfo: UserUpdationInfo) => {
    try {
      await updateUser(userUpdateInfo, userInfo.id_persona)
      showToast('succesfull', 'datos de el usuario actualizados')
    } catch (error) {
      showToast('error', 'Error actualizando datos de el usuario')
    }
  }

  if (loading || !userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Cargando información del usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Mostrar la información del usuario si se obtiene correctamente
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className='toast toast-top toast-end'>
        {succesfullMessage && <div className='alert alert-success'>
          <span>{succesfullMessage}</span>
        </div>}

        {errorMessage && <div className='alert alert-error'>
          <span>{errorMessage}</span>
        </div>}
      </div>

      <div className="p-6 max-w-4xl w-full bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          Editar {userInfo ? userInfo.nombre : 'Usuario'}
        </h1>
        <UserForm onSuccessfulSend={updateUserAdmin} initialData={{
          identificacion: userInfo.identificacion,
          nombre: userInfo.nombre,
          nombre_tipo_identificacion: userInfo.nombre_tipo_identificacion.toLowerCase(),
          correo: userInfo.correo,
          contrasena: '',
          telefono: userInfo.telefono
        }} buttonName='Actualizar datos de usuario' showPasswordFields={false}
          exemptValues={{ email: userInfo.correo, phone: userInfo.telefono.toString() }} />

        <div className="flex justify-center mt-4 gap-6">
          <div>
            <button
              onClick={onSearchUser}
              className="min-w-[200px] min-h-[55px] bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-colors duration-200 text-xl"
            >
              Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
