import { QuerySelection, searchUserSelectionInfo } from "../backend/user";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from '@tanstack/react-query'
import { UserSelectionInfo } from "../backend/entities";

type Props = {
  onChangeUser: (user_id: string) => void;
};

const UserSelectionComponent = ({ onChangeUser }: Props) => {
  const [queryType, setQueryType] = useState<QuerySelection>("UserName");

  const [selectedUser, setSelectedUser] = useState<undefined | UserSelectionInfo>()

  const [inputValue, setInputValue] = React.useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [debouncedValue] = useDebounce(inputValue, 500);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users_selection", debouncedValue, queryType],
    queryFn: async () => searchUserSelectionInfo(debouncedValue, queryType, 10),
  });

  const onSelectUser = (userInfo: UserSelectionInfo) => {
    onChangeUser(userInfo.id_persona)
    setSelectedUser(userInfo)
  }

  return (
    <details className="dropdown w-full max-w-sm shadow-lg rounded-xl transition-all ease-in-out duration-300 justify-center">
      <summary className="m-1 w-full text-left cursor-pointer bg-gray-950 rounded-xl p-4 border-2 border-transparent hover:border-blue-500 hover:bg-gray-800 justify-center">
        {selectedUser ? (
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-white justify-center">{selectedUser.nombre}</span>
            <span className="text-sm text-gray-400 justify-center">{selectedUser.correo}</span>
          </div>
        ) : (
          <span className="text-white justify-center">Seleccione a Un Usuario</span>
        )}
      </summary>
      <div className="menu dropdown-content rounded-box z-10 w-full p-2 shadow-black shadow-lg bg-gray-950 justify-center">
        <div className="flex gap-2 mb-2 justify-center">
          <button
            className={`btn ${queryType === "UserName" ? "bg-blue-500 text-white" : "border-gray-300"}`}
            onClick={() => setQueryType("UserName")}
          >
            UserName
          </button>
          <button
            className={`btn ${queryType === "Email" ? "bg-blue-500 text-white" : "border-gray-300"}`}
            onClick={() => setQueryType("Email")}
          >
            Email
          </button>
          <button
            className={`btn ${queryType === "PhoneNumber" ? "bg-blue-500 text-white" : "border-gray-300"}`}
            onClick={() => setQueryType("PhoneNumber")}
          >
            PhoneNumber
          </button>
        </div>


        <input
          className="border rounded-xl px-3 py-2 w-full outline-none mb-2"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Search by ${queryType}...`}
        />

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          (users ?? []).length > 0 && (
            <ul className="border rounded shadow bg-gray-950 max-h-60 overflow-y-auto">
              {(users ?? []).map((user) => (
                <li
                  key={user.id_persona}
                  className={`
p-2 cursor-pointer 
border-b last:border-b-0 
hover:bg-gray-900 
${user.matricula_valida ? "border-l-4 border-green-500" : "border-l-4 border-red-500"}
`}
                  onClick={() => onSelectUser(user)}
                >
                  <p className="font-semibold">{user.nombre}</p>
                  <p className="text-sm">{user.correo}</p>
                  <p className="text-sm text-gray-500">{user.telefono}</p>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </details>
  );
};

export default UserSelectionComponent;

