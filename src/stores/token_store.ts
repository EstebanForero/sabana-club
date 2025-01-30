import { Store } from "@tanstack/react-store";

export const tokenStore = new Store("");

export function getToken() {
  if (!tokenStore) {

  }
}

export function saveToken(token: string) {
  console.log('saving token')
  tokenStore.setState(() => token)
}
