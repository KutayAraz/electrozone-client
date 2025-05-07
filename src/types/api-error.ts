export interface StandardErrorResponse {
  statusCode: number;
  type: string;
  message: string;
  details?: string;
}

export interface ApiErrorPayload {
  data: StandardErrorResponse;
  status: number;
}

export enum HttpStatus {
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
}
