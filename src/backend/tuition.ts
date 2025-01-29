
import ky from "ky";
import { Tuition, TuitionInfo } from "./entities";
import { tokenStore } from "../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev";

export async function createTuition(tuitionInfo: TuitionInfo): Promise<void> {
  await ky.post(`${backendUrl}/tuition`, {
    json: tuitionInfo,
  });
}

export async function getTuitionsForUser(idPersona: string): Promise<Tuition[]> {
  return await ky.get(`${backendUrl}/tuition/user/${idPersona}`).json<Tuition[]>();
}

export async function getMostRecentTuition(idPersona: string): Promise<Tuition> {
  return await ky.get(`${backendUrl}/tuition/user/${idPersona}/recent`).json<Tuition>();
}


// Obtiene las matriculas de el usuario que esta actualmente registrado
export async function getTuitionsForUserWithExtension(): Promise<Tuition[]> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/tuition`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<Tuition[]>();
}

