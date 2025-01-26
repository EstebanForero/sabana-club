import ky from "ky";
import { UserInfo } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev/"

export async function getUserByIdentification(identification: string): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user/${identification}`).json<UserInfo>();
}

export async function getAllUsers(): Promise<UserInfo[]> {
  return await ky.get(`${backendUrl}/user/all`).json<UserInfo[]>();
}

// Solo se puede usar despues de iniciar sesion
export async function getCurrentUser(): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user`).json<UserInfo>();
}
