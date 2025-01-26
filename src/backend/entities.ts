
export type UserCreationInfo = {
  nombre: string;
  contrasena: string;
  correo: string;
  telefono: number;
  identificacion: string;
  nombre_tipo_identificacion: string;
};

export type UserInfo = {
  id_persona: string;
  nombre: string;
  correo: string;
  telefono: number;
  identificacion: string;
  nombre_tipo_identificacion: string;
  es_admin: boolean;
};

export type Tournament = {
  id_torneo: string;
  nombre: string;
};

export type UserTournamentRegistration = {
  id_persona: string;
  id_torneo: string;
  puesto: number;
};

export type Training = {
  id_entrenamiento: string;
  tiempo_minutos: number;
  nombre_entrenamiento: string;
};

export type TrainingRegistration = {
  id_entrenamiento: string;
  id_persona: string;
};

export type Tuition = {
  id_persona: string;
  monto_usd: number;
  fecha_inscripccion: string;
};

export type TuitionInfo = {
  id_persona: string;
  monto_usd: number;
};
