import { exists_email, exists_phone } from "../backend/auth";
import { UserCreationInfo } from "../backend/entities";

export const validateRequired = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "Este campo es requerido";
  }
};

export const validateEmail = async (value: string): Promise<string | undefined> => {
  if (!value || value.trim() === "") {
    return "El correo electrónico es requerido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Correo electrónico inválido";
  }

  if (await exists_email(value)) {
    return "Este correo electronico ya esta registrado"
  }
};

export const validatePassword = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "La contraseña es requerida";
  }

  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

export const validatePhone = async (value: string): Promise<string | undefined> => {
  if (!value || value.trim() === "") {
    return "El número de teléfono es requerido";
  }

  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(value)) {
    return "El número de teléfono solo puede contener dígitos";
  }

  if (value.length < 7 || value.length > 11) {
    return "El número de teléfono debe tener entre 7 y 11 dígitos";
  }

  console.log('validating phone')
  if (await exists_phone(value)) {
    return "Este numero de telefono ya esta registrado"
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

  if (value == '6') {
    return undefined
  }

  if (value.length < 3 || value.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(value)) {
    return "El nombre de usuario solo puede contener letras y números";
  }

  const usernameRegexv2 = /^[A-Za-z0-9]+$/;

  if (!usernameRegexv2.test(value)) {
    return "Username solo debe contener letras y numeros";
  }
};

export const validateUserCreation = async (
  userInfo: UserCreationInfo
): Promise<{ isValid: boolean; errorMessage?: string }> => {

  const nombreError = validateUsername(userInfo.nombre);
  if (nombreError) return { isValid: false, errorMessage: nombreError };

  const contrasenaError = validatePassword(userInfo.contrasena);
  if (contrasenaError) return { isValid: false, errorMessage: contrasenaError };

  const correoError = await validateEmail(userInfo.correo);
  if (correoError) return { isValid: false, errorMessage: correoError };

  const telefonoError = await validatePhone(userInfo.telefono.toString());
  if (telefonoError) return { isValid: false, errorMessage: telefonoError };

  const identificacionError = validateId(userInfo.identificacion);
  if (identificacionError) return { isValid: false, errorMessage: identificacionError };

  const idTypeError = validateRequired(userInfo.nombre_tipo_identificacion);
  if (idTypeError) return { isValid: false, errorMessage: idTypeError };

  return { isValid: true };
};
