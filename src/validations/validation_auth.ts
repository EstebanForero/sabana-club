// validators.ts

// General Required Field Validator
export const validateRequired = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "Este campo es requerido";
  }
};

// Email Validator
export const validateEmail = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El correo electrónico es requerido";
  }

  // Regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Correo electrónico inválido";
  }
};

// Password Validator
export const validatePassword = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "La contraseña es requerida";
  }

  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  // Optional: Require at least one number, one uppercase, one lowercase, and one special character
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(value)) {
    return "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.";
  }
};

// Confirm Password Validator
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

// Phone Number Validator
export const validatePhone = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El número de teléfono es requerido";
  }

  // Ensure only numeric characters
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(value)) {
    return "El número de teléfono solo puede contener dígitos";
  }

  // Ensure length is valid (e.g., typical phone numbers are between 7-15 digits)
  if (value.length < 7 || value.length > 15) {
    return "El número de teléfono debe tener entre 7 y 15 dígitos";
  }
};

// Identification (ID) Validator
export const validateId = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "La identificación es requerida";
  }

  // Ensure ID contains only numeric characters
  const numericRegex = /^[0-9]+$/;
  if (!numericRegex.test(value)) {
    return "La identificación solo puede contener dígitos";
  }

  // Ensure ID length (modify this as per your requirements)
  if (value.length < 5 || value.length > 15) {
    return "La identificación debe tener entre 5 y 15 dígitos";
  }
};

// Username Validator
export const validateUsername = (value: string): string | undefined => {
  if (!value || value.trim() === "") {
    return "El nombre de usuario es requerido";
  }

  // Username must be between 3 and 20 characters long
  if (value.length < 3 || value.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }

  // Ensure no special characters (only letters and numbers allowed)
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(value)) {
    return "El nombre de usuario solo puede contener letras y números";
  }
};


