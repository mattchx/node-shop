class HttpError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class ValidationError extends HttpError {
  constructor(message = 'Validation Error') {
    super(message, 422);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  NotFoundError,
  ValidationError
};
