import { getToken } from "@/lib/auth/token";
import { ApiError } from "./errors";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3001/api/v1";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
  query?: Record<string, string | number | undefined>;
};

function buildUrl(path: string, query?: Record<string, string | number | undefined>) {
  const url = new URL(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export async function apiRequest<T>(
  path: string,
  { body, auth = true, query, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getToken();
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: requestHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  return response.json() as Promise<T>;
}

export async function apiRequestBlob(
  path: string,
  options: Omit<RequestOptions, "body"> = {},
): Promise<Blob> {
  const requestHeaders = new Headers(options.headers);
  const token = getToken();

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers: requestHeaders,
  });

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  return response.blob();
}

export { API_BASE };
