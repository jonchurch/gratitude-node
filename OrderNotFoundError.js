const ApplicationError = require('./ApplicationError');
class OrderNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No Order found with that id.', 404);
  }
}