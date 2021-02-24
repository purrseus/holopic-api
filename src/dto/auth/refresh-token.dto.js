const { Segments, Joi } = require('celebrate');

const refreshTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = refreshTokenDto;
