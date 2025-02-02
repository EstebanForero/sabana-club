import ky from "ky";
import { tokenStore } from "./../stores/token_store";
import { RequestContent } from "./entities";

const backendUrl = "https://sabana-club-backend.fly.dev"


export async function CreateRequest(request: RequestContent) {
  const token = tokenStore.state

  ky.post(`${backendUrl}/request`, {
    json: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function GetAllRequests() {
  const token = tokenStore.state
  return ky.get(`${backendUrl}/request/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function DeleteRequest(request_id: string) {
  const token = tokenStore.state
  ky.delete(`${backendUrl}/request/${request_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function ExecuteRequest(request_id: string) {
  const token = tokenStore.state
  ky.post(`${backendUrl}/request/execute/${request_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
