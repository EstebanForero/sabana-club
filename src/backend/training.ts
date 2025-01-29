import ky from "ky";
import { Training, TrainingRegistration } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev";

// This function returns the newly crted training id
export async function createTraining(trainingInfo: TrainingInfo): Promise<string> {
  const response = await ky.post(`${backendUrl}/training/`, {
    json: trainingInfo
  });
  return await response.json<string>();
}

export async function registerUserInTraining(registration: TrainingRegistration): Promise<void> {
  await ky.post(`${backendUrl}/training/register`, {
    json: registration,
  });
}

export async function getAllTrainings(): Promise<Training[]> {
  return await ky.get(`${backendUrl}/training/all`).json<Training[]>();
}

export async function getUsersInTraining(idEntrenamiento: string): Promise<TrainingRegistration[]> {
  return await ky.get(`${backendUrl}/training/users/${idEntrenamiento}`).json<TrainingRegistration[]>();
}

// No usar por el momento
// Obtiene los entrenamientos de el usuario registrado actualmente
export async function getTrainingsForCurrentUser(): Promise<Training[]> {
  return await ky.get(`${backendUrl}/training`).json<Training[]>();
}

// El user identifier puede ser email o telefono o el id de el usuario
export async function getTrainingsForUser(userIdentifier: string): Promise<Training[]> {
  return await ky.get(`${backendUrl}/training/${userIdentifier}`).json<Training[]>();
}

export type TrainingInfo = {
  tiempo_minutos: number;
  nombre_entrenamiento: string;
};


