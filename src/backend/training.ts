import ky from "ky";
import { Training, TrainingRegistration } from "./entities";
import { tokenStore } from "../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev";

// This function returns the newly crted training id
export async function createTraining(trainingInfo: TrainingInfo): Promise<string> {
  const response = await ky.post(`${backendUrl}/training`, {
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

export async function deleteTraining(training_id: string) {
  const token = tokenStore.state
  await ky.delete(`${backendUrl}/training/delete/${training_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTraining(training_id: string): Promise<Training> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/training/id/${training_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<Training>();
}

// Obtiene los entrenamientos de el usuario registrado actualmente
export async function getTrainingsForCurrentUser(): Promise<Training[]> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/training`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<Training[]>();
}

// El user identifier puede ser email o telefono o el id de el usuario
export async function getTrainingsForUser(userIdentifier: string): Promise<Training[]> {
  return await ky.get(`${backendUrl}/training/${userIdentifier}`).json<Training[]>();
}

export type TrainingInfo = {
  tiempo_minutos: number;
  nombre_entrenamiento: string;
};


