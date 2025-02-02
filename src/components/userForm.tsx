
import React, { useState } from 'react'
import InputComponent from './inputComponent';
import { validateConfirmPassword, validateEmail, validateId, validatePassword, validatePhone, validateUsername } from 'src/validations/validation_auth';
import { UserCreationInfo } from 'src/backend/entities';
import { validateUserCreation } from 'src/validations/validation_auth';

type Props = {
  onSuccessfulSend: (userCreationInfo: UserCreationInfo) => void
}

const UserForm = (props: Props) => {

  const [idType, setIdType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState("")

  const onClickButton = async () => {
    const userCreationInfo: UserCreationInfo = {
      identificacion: id,
      telefono: Number(phone),
      correo: email,
      contrasena: password,
      nombre: nombreUsuario,
      nombre_tipo_identificacion: idType
    }

    const validateResult = await validateUserCreation(userCreationInfo)

    if (!validateResult.isValid) {
      setErrorMessage(validateResult.errorMessage ?? '')
      setTimeout(() => setErrorMessage(''), 4000)
      return
    }

    props.onSuccessfulSend(userCreationInfo)
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col">
        <label htmlFor="idType" className="text-sm text-gray-300 mb-2">
          Tipo de Identificación
        </label>
        <select
          id="idType"
          value={idType}
          onChange={(e) => setIdType(e.target.value)}
          className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
        >
          <option value="">Selecciona tu tipo de identificación</option>
          <option value="cc">Cédula de Ciudadanía</option>
          <option value="ti">Tarjeta de Identidad</option>
          <option value="ce">Cédula de Extranjería</option>
          <option value="passport">Pasaporte</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputComponent
          name="Identificación"
          placeholder="Ingresa tu Identificación"
          type="text"
          validator={validateId}
          onChange={setId}
        />

        <InputComponent
          name="Nombre de Usuario"
          placeholder="Ingresa tu nombre de usuario"
          type="text"
          validator={validateUsername}
          onChange={setNombreUsuario}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputComponent
          name="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          type="email"
          validator={validateEmail}
          onChange={setEmail}
        />

        <InputComponent
          name="Teléfono"
          placeholder="Ingresa tu número de teléfono"
          type="tel"
          validator={validatePhone}
          onChange={setPhone}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputComponent
          name="Contraseña"
          placeholder="Crea una contraseña"
          type="password"
          validator={validatePassword}
          onChange={setPassword}
        />

        <InputComponent
          name="Confirmar Contraseña"
          placeholder="Confirma tu contraseña"
          type="password"
          validator={(val) => validateConfirmPassword(val, password)}
          onChange={setConfirmPassword}
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="text-red-500 mb-3">{errorMessage}</p>
        <button
          onClick={onClickButton}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Registrar
        </button>
      </div>
    </div>
  )
}

export default UserForm
