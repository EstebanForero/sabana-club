import ky from "ky";
import { UserUpdationInfo } from "./entities";
import { tokenStore } from "./../stores/token_store";

const backendUrl = "https://sabana-club-backend.fly.dev"

export type Request = { UpdateUser: { user_updation: UserUpdationInfo, user_id: string } }

async function CreateRequest(request: Request) {
  const token = tokenStore.state

  ky.post(`${backendUrl}/request`, {
    json: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

async function ExecuteRequest(request_id: string) {
  ky.post(`${backendUrl}/request/execute/${request_id}`)
}
