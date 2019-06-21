export class ApiError extends Error {
  originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    Object.setPrototypeOf(this, this.constructor.prototype);
    this.originalError = originalError;
  }
}

export class NetworkError extends ApiError {
  constructor(message: string, originalError?: Error) {
    super(message, originalError);
    Object.setPrototypeOf(this, this.constructor.prototype);
  }
}

export class RespondedError extends ApiError {
  status: number;
  response: Response;

  constructor(response: Response, message?: string) {
    super(message || response.statusText);
    Object.setPrototypeOf(this, this.constructor.prototype);
    this.status   = response.status;
    this.response = response;
  }
}
