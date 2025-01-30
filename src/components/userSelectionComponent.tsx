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
    queryFn: async () => searchUserSelectionInfo(debouncedValue, queryType, 10)
  });

  const onSelectUser = (userInfo: UserSelectionInfo) => {
    onChangeUser(userInfo.id_persona)
    setSelectedUser(userInfo)
  }

  if (isLoading || !users) {
    return <p>Loading</p>
  }

  return (
    <details className="dropdown w-full max-w-sm">
      <summary className="m-1 w-full text-left cursor-pointer bg-gray-950 rounded-xl p-4">
        {selectedUser ? (
          <div className="flex flex-col">
            <span className="font-semibold">{selectedUser.nombre}</span>
            <span className="text-sm">{selectedUser.correo}</span>
          </div>
        ) : (
          "Select a user"
        )}
      </summary>

      <div className="menu dropdown-content bg-base-100 rounded-box z-10 w-full p-2 shadow-lg">
        <div className="filter flex gap-2 mb-2">
          <input
            className="btn filter-reset bg-blue-500"
            type="radio"
            name="queryType"
            value="All"
            onChange={() => setQueryType("UserName")}
            aria-label="All"
          />
          <input
            className="btn"
            type="radio"
            name="queryType"
            value="UserName"
            checked={queryType === "UserName"}
            onChange={() => setQueryType("UserName")}
            aria-label="UserName"
          />
          <input
            className="btn"
            type="radio"
            name="queryType"
            value="Email"
            checked={queryType === "Email"}
            onChange={() => setQueryType("Email")}
            aria-label="Email"
          />
          <input
            className="btn"
            type="radio"
            name="queryType"
            value="PhoneNumber"
            checked={queryType === "PhoneNumber"}
            onChange={() => setQueryType("PhoneNumber")}
            aria-label="PhoneNumber"
          />
        </div>

        <input
          className="border rounded px-2 py-1 w-full outline-none mb-2"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Search by ${queryType}...`}
        />

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          users?.length > 0 && (
            <ul className="border rounded shadow bg-gray-950 max-h-60 overflow-y-auto">
              {users.map((user) => (
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

