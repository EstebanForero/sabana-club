import ky from "ky";
import { UserCreationInfo } from "./entities";
import { tokenStore } from "./../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev"

export async function registerUser(userCreationInfo: UserCreationInfo) {
  await ky.post(`${backendUrl}/user`, {
    json: userCreationInfo
  })
}

export type LogInInfo = {
  identificacion: string,
  contrasena: string,
}

export async function logInUser(logInInfo: LogInInfo) {
  return await ky.post(`${backendUrl}/log_in`, {
    json: logInInfo,
  }).text()
}

async function testAuth(token: string) {
  return await ky.get(`${backendUrl}/test_auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function isAuthenticated() {

  const token = tokenStore.state

  if (!token) {
    return false
  }


  try {
    await testAuth(token)
    return true
  } catch (error) {
    return false
  }
}
