import ky from "ky";
import { UserInfo, UserSelectionInfo } from "./entities";
import { tokenStore } from "./../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev"

export async function getUserByIdentification(identification: string): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user/${identification}`).json<UserInfo>();
}

export async function getAllUsers(): Promise<UserInfo[]> {
  return await ky.get(`${backendUrl}/user/all`).json<UserInfo[]>();
}

type QuerySelection = "Email" | "PhoneNumber" | "UserName"

export async function searchUserSelectionInfo(query: string, selection: QuerySelection, limit: number): Promise<UserSelectionInfo[]> {
  return await ky.get(`${backendUrl}/user/search/${query}/${selection}/${limit}`).json<UserSelectionInfo[]>();
}

export async function getCurrentUser(): Promise<UserInfo> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<UserInfo>();
}

