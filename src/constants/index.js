const IS_PRODUCTION = process.env.NODE_ENV !== 'development';
const ROOT_DIR = __dirname.replace(/\/src\/\w+$/g, '');
const GLOBAL_PREFIX = '/api/v1';
const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { IS_PRODUCTION, ROOT_DIR, GLOBAL_PREFIX, STATUS_CODE };
