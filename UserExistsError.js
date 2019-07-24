const ApplicationError = require('./ApplicationError'); 

class UserExistsError extends ApplicationError{
  constructor(message) {
    super(message || 'User Exists', 410);
  }
}
module.exports = UserExistsError;