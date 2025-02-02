import { exists_email, exists_phone } from "../backend/auth";
import { UserCreationInfo } from "../backend/entities";

export const validateRequired = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "Este campo es requerido";
  }
};

export const validateEmailFormat = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El correo electrónico es requerido";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Correo electrónico inválido";
  }
};

export const validatePassword = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "La contraseña es requerida";
  }
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(value)) {
    return "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.";
  }
};

export const validateConfirmPassword = (
  confirmValue: string,
  passwordValue: string
): string | undefined => {
  if (!confirmValue || confirmValue.trim() === "") {
    return "Por favor confirma la contraseña";
  }
  if (confirmValue !== passwordValue) {
    return "Las contraseñas no coinciden";
  }
};

export const validatePhoneFormat = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El número de teléfono es requerido";
  }
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(value)) {
    return "El número de teléfono solo puede contener dígitos";
  }
  if (value.length < 7 || value.length > 12) {
    return "El número de teléfono debe tener entre 7 y 12 dígitos";
  }
};

export const validateId = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "La identificación es requerida";
  }
  const numericRegex = /^[0-9]+$/;
  if (!numericRegex.test(value)) {
    return "La identificación solo puede contener dígitos";
  }
  if (value.length < 5 || value.length > 15) {
    return "La identificación debe tener entre 5 y 15 dígitos";
  }
};

export const validateUsername = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El nombre de usuario es requerido";
  }
  if (value.length < 3 || value.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }
  const usernameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
  if (!usernameRegex.test(value)) {
    return "El nombre de usuario solo puede contener letras, números y un solo espacio entre palabras";
  }
};

export const checkEmailExists = async (value: string): Promise<string | undefined> => {
  if (await exists_email(value)) {
    return "Este correo electrónico ya está registrado";
  }
};

export const checkPhoneExists = async (value: string): Promise<string | undefined> => {
  if (await exists_phone(value)) {
    return "Este número de teléfono ya está registrado";
  }
};

type Validator = (value: string) => (string | undefined) | Promise<string | undefined>

export const withExeption = (exeption: string | undefined, validator: Validator): Validator => {
  return async (value: string) => {
    if (exeption == value) {
      return undefined
    }

    return await validator(value)
  }
}

export type ExistanceValues = {
  email?: string,
  phone?: string
}

export const validateUserCreation = async (
  userInfo: UserCreationInfo,
  withPassword: boolean,
  verifyExistanceExeption: ExistanceValues | undefined
): Promise<{ isValid: boolean; errorMessage?: string }> => {

  const validators = [
    { error: validateUsername(userInfo.nombre) },
    { error: validateEmailFormat(userInfo.correo) },
    { error: validatePhoneFormat(userInfo.telefono.toString()) },
    { error: validateId(userInfo.identificacion) },
    { error: validateRequired(userInfo.nombre_tipo_identificacion) }
  ];

  if (withPassword) {
    validators.push({ error: validatePassword(userInfo.contrasena) });
  }

  for (const { error } of validators) {
    if (error) return { isValid: false, errorMessage: error };
  }

  const emailExistsError = await checkEmailExists(userInfo.correo);
  if (emailExistsError && verifyExistanceExeption?.email != userInfo.correo) return { isValid: false, errorMessage: emailExistsError };

  const phoneExistsError = await checkPhoneExists(userInfo.telefono.toString());
  if (phoneExistsError && verifyExistanceExeption?.phone != userInfo.telefono.toString()) return { isValid: false, errorMessage: phoneExistsError };

  return { isValid: true };
};

