import ky from "ky";
import { Training, TrainingRegistration } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev/";

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


export type TrainingInfo = {
  tiempo_minutos: number;
  nombre_entrenamiento: string;
};


