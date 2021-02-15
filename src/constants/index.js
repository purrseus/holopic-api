const IS_PRODUCTION = process.env.NODE_ENV !== 'development';
const ROOT_DIR = __dirname.replace(/\/src\/\w+$/g, '');
const GLOBAL_PREFIX = '/api/v1';

module.exports = { IS_PRODUCTION, ROOT_DIR, GLOBAL_PREFIX };
