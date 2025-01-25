import ky from "ky";
import { UserCreationInfo } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev/"

export function registerUser(userCreationInfo: UserCreationInfo) {
  ky.post(`${backendUrl}/user`, {
    json: userCreationInfo
  })
}

export type LogInInfo = {
  identificacion: string,
  contrasena: string,
}

export function logInUser(logInInfo: LogInInfo) {
  ky.post(`${backendUrl}/log_in`, {
    json: logInInfo
  })
}

