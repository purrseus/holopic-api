const { Segments, Joi } = require('celebrate');

module.exports.refreshTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports.uidDto = {
  [Segments.PARAMS]: Joi.object().keys({
    uid: Joi.string().required(),
  }),
};

module.exports.pageDto = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
  }),
};

module.exports.editProfileDto = {
  [Segments.BODY]: Joi.object().keys({
    fullName: Joi.string().min(0).max(64),
    username: Joi.string().min(4).max(32),
    gender: Joi.string().valid('N/A', 'MALE', 'FEMALE'),
    avatar: Joi.string().min(3),
    bio: Joi.string().min(0).max(255),
    location: Joi.string().min(0).max(255),
  }),
};

module.exports.searchUserDto = {
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
    page: Joi.number().integer().min(1).required(),
  }),
};

module.exports.verifyFirebaseTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};
