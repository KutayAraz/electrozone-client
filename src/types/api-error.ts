export interface StandardErrorResponse {
  statusCode: number;
  type: string;
  message: string;
  details?: string;
}

export enum ErrorType {
  QUANTITY_LIMIT_EXCEEDED = "QUANTITY_LIMIT_EXCEEDED",
  STOCK_LIMIT_EXCEEDED = "STOCK_LIMIT_EXCEEDED",
  INVALID_NEW_PASSWORD = "INVALID_NEW_PASSWORD",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  PRODUCT_PRICE_CHANGED = "PRODUCT_PRICE_CHANGED",
}

export interface ApiErrorPayload {
  type: ErrorType;
  data: StandardErrorResponse;
  status: number;
}

export enum HttpStatus {
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
}
