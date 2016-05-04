class NotImplementedError extends Error {}


class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}


module.exports = {
  NotImplementedError,
  ValidationError
};
