import ky from "ky";
import { UserCreationInfo } from "./entities";

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
  await ky.post(`${backendUrl}/log_in`, {
    json: logInInfo,
  })
}

export async function testAuth(token: string) {
  return await ky.get(`${backendUrl}/test_auth`)
} 
