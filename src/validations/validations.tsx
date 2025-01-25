// Validators
export const validateNumericInput = (value: string): boolean => {
  return /^\d*$/.test(value);
};

export const validateEmail = (value: string): string => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Correo electrónico no válido";
  }
  return "";
};

export const validatePassword = (value: string): string => {
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return "";
};



// Handlers

export const handleNumericChange = (    // Valida que los campos de id y de telefono solo ingresen numeros
  e: React.ChangeEvent<HTMLInputElement>,
  setId: React.Dispatch<React.SetStateAction<string>>,
  setPhone: React.Dispatch<React.SetStateAction<string>>
) => {
  const { id, value } = e.target;
  if (validateNumericInput(value)) {
    if (id === "id") {
      setId(value);
    } else if (id === "phone") {
      setPhone(value);
    }
  }
};

export const handleEmailChange = (      // Valida que el campo de email sea un email valido
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailError: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  setEmail(value);
  setEmailError(validateEmail(value));
};

export const handlePasswordChange = (       // Valida que el campo de password tenga al menos 8 caracteres
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  setPassword(value);
  setPasswordError(validatePassword(value));
};

export const handleConfirmPasswordChange = (        // Valida que el campo de confirmar password sea igual al campo de password
  e: React.ChangeEvent<HTMLInputElement>,
  password: string,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>
) => {
  const value = e.target.value;
  setConfirmPassword(value);
  setConfirmPasswordError(validateConfirmPassword(password, value));
};

