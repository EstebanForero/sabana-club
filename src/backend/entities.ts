
export type UserCreationInfo = {
  nombre: string;
  contrasena: string;
  correo: string;
  telefono: string;
  identificacion: string;
  nombre_tipo_identificacion: string;
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

