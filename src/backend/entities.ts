export type UserTournamentInfo = {
  id_torneo: string,
  nombre: string,
  puesto: number,
}

export type UserCreationInfo = {
  nombre: string;
  contrasena: string;
  correo: string;
  telefono: number;
  identificacion: string;
  nombre_tipo_identificacion: string;
};

export type UserUpdationInfo = {
  nombre: string;
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
  nombre_rol: UserRol
};

export type UserSelectionInfo = {
  id_persona: string;
  nombre: string;
  correo: string;
  telefono: number;
  identificacion: string;
  nombre_tipo_identificacion: string;
  nombre_rol: UserRol
  matricula_valida: boolean;
};

export type UserRol = "Usuario" | "Admin" | "Entrenador"

export const roles: UserRol[] = ["Usuario", "Admin", "Entrenador"]

export type Tournament = {
  id_torneo: string;
  nombre: string;
};

export type UserTournamentRegistration = {
  nombre: string;
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


export type RequestCommand = {
  requester_id: string,
  request_id: string,
  command_name: "update_user",
  command_content: RequestContent,
  aprover_id?: string,
  completed: boolean
}

interface RequestBase {
  type: string
}

export type RequestContent = UserUpdateRequest | DeleteTournamentRequest
export type CommandType = "UpdateUser" | "DeleteTournament"
export interface DeleteTournamentRequest extends RequestBase { type: CommandType, tournament_id: string }
export interface UserUpdateRequest extends RequestBase { type: CommandType, user_updation: UserUpdationInfo, user_id: string }
