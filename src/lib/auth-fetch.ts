/**
 * Client-side helper for calling the Express backend with a Better Auth JWT.
 *
 * The JWT is short-lived (15 minutes), so we fetch a fresh one for every
 * request instead of caching it. The session cookie is sent automatically.
 */
export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const tokenResponse = await fetch("/api/auth/token", {
    credentials: "include",
    cache: "no-store",
  })

  if (!tokenResponse.ok) {
    throw new Error("Please sign in again to continue")
  }

  const { token } = (await tokenResponse.json()) as { token?: string }

  if (!token) {
    throw new Error("Please sign in again to continue")
  }

  const headers = new Headers(init.headers)
  headers.set("Authorization", `Bearer ${token}`)

  return fetch(input, { ...init, headers })
}
