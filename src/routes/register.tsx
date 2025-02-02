import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { registerUser } from '../backend/auth';
import { UserCreationInfo } from '../backend/entities';
import UserForm from '../components/userForm';

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/login' })

  const onRegister = async (userCreationInfo: UserCreationInfo) => {
    registerUser(userCreationInfo)
      .then(() => navigate({ to: '/login' }))
      .catch(e => console.log("Error registering user: ", e));
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-6 bg-gray-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Únete a Club Sabana
        </h2>

        <UserForm onSuccessfulSend={onRegister} />
      </div>
    </div>

  );
}

export default RouteComponent;

