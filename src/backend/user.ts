import ky from "ky";
import { UserInfo } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev"

export async function getUserByIdentification(identification: string): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user/${identification}`).json<UserInfo>();
}

export async function getAllUsers(): Promise<UserInfo[]> {
  return await ky.get(`${backendUrl}/user/all`).json<UserInfo[]>();
}


// No usar por el momento
// Obtiene la informacion de el usuario actualmente loggeado
export async function getCurrentUser(): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user`, {
    // credentials: 'include'
  }).json<UserInfo>();
}
