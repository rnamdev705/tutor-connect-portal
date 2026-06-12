import type { ApiErrorBody } from "./types";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let body: ApiErrorBody | undefined;

    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // non-JSON error body
    }

    const message = body?.error?.message ?? response.statusText ?? "Request failed";
    return new ApiError(response.status, message, body?.error?.code, body?.error?.details);
  }
}
