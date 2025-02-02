
import ky from "ky";
import { Tournament, UserTournamentInfo, UserTournamentRegistration } from "./entities";
import { tokenStore } from "../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev";

export async function createTournament(nombre: string): Promise<void> {
  await ky.post(`${backendUrl}/tournament/name/${nombre}`);
}

export async function deleteTournament(tournament_id: string): Promise<void> {
  await ky.post(`${backendUrl}/tournament/delete/${tournament_id}`);
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
  return await ky.post(`${backendUrl}/tournament/users/${id_torneo}`, {
  }).json<UserTournamentRegistration[]>();
}


// Esta funcion obtiene los torneos de el usuario que esta actualmente registrado
export async function getTournamentsOfCurrentUser(): Promise<UserTournamentInfo[]> {
  const token = tokenStore.state
  return await ky.get(`${backendUrl}/tournament`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<UserTournamentInfo[]>();
}

export async function getTournamentByUser(identificator: string): Promise<UserTournamentInfo[]> {
  return await ky.get(`${backendUrl}/tournament/${identificator}`).json<UserTournamentInfo[]>();
}

