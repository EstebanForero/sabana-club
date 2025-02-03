import ky from "ky";
import { UserInfo, UserRol, UserSelectionInfo, UserUpdationInfo } from "./entities";
import { tokenStore } from "./../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev"

export async function getUserByIdentification(identification: string): Promise<UserInfo> {
  return await ky.get(`${backendUrl}/user/${identification}`).json<UserInfo>();
}

export async function getAllUsers(): Promise<UserInfo[]> {
  return await ky.get(`${backendUrl}/user/all`).json<UserInfo[]>();
}

export type QuerySelection = "Email" | "PhoneNumber" | "UserName"

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

export async function updateUserRole(userRole: UserRol, user_id: string) {
  const token = tokenStore.state
  return await ky.put(`${backendUrl}/user/role/${userRole}/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateCurrentUser(userUpdationInfo: UserUpdationInfo): Promise<UserInfo> {
  const token = tokenStore.state
  return await ky.put(`${backendUrl}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: userUpdationInfo
  }).json<UserInfo>();
}

export async function updateUser(userUpdationInfo: UserUpdationInfo, user_id: string): Promise<UserInfo> {
  const token = tokenStore.state
  userUpdationInfo.nombre_tipo_identificacion = userUpdationInfo.nombre_tipo_identificacion.toUpperCase()
  return await ky.put(`${backendUrl}/user/id/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: userUpdationInfo
  }).json<UserInfo>();
}

export async function currentUserRol(): Promise<UserRol> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/user/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<UserRol>();
}
