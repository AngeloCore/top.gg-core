const InternalError = require('./InternalError');

class TopGGApiError extends InternalError {
  constructor(status, message) {
    super(status, message);
    console.log(status, message);
  }
}

module.exports = TopGGApiError;