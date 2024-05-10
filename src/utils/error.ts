export class HttpError extends Error {
  code: number;

  constructor(
    errorCode: number = 500,
    message: string = 'Something went wrong. Please try again later.'
  ) {
    super(message);
    this.code = errorCode;
  }
}
