const { Segments, Joi } = require('celebrate');

const uidDto = {
  [Segments.PARAMS]: Joi.object().keys({
    uid: Joi.string().required(),
  }),
};

module.exports = uidDto;
