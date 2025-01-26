
import ky from "ky";
import { Tournament, UserTournamentRegistration } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev/";

export async function createTournament(nombre: string): Promise<void> {
  await ky.post(`${backendUrl}/tournament/${nombre}`);
}

export async function registerUserInTournament(registration: UserTournamentRegistration): Promise<void> {
  await ky.post(`${backendUrl}/tournament/register`, {
    json: registration,
  });
}

export async function getAllTournaments(): Promise<Tournament[]> {
  return await ky.get(`${backendUrl}/tournament/all`).json<Tournament[]>();
}

export async function getUsersInTournament(id_torneo: string): Promise<UserTournamentRegistration[]> {
  return await ky.post(`${backendUrl}/tournament/users`, {
    json: id_torneo,
  }).json<UserTournamentRegistration[]>();
}

