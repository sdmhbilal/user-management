// API endpoints for user-related APIs
const API_ENDPOINTS = {
  USER: {
    DEFAULT: '/',
    INDEX: '/users',
    DELETE_USER: '/:userId',
    GET_USER: '/:userId',
    UPDATE_USER: '/:userId'
  }
};

// HTTP status codes for different responses
const HTTP_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500
};

export { API_ENDPOINTS, HTTP_CODES };
