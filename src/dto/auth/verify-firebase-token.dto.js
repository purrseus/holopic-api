const { Segments, Joi } = require('celebrate');

const verifyFirebaseTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};

module.exports = verifyFirebaseTokenDto;
