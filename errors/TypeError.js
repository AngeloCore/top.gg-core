const InternalError = require('./InternalError');

class TypeError extends InternalError {
  constructor(status, message) {
    super(status, message);
    console.log(status, message);
  }
}

module.exports = TypeError;