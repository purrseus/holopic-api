const { Segments, Joi } = require('celebrate');

const uploadImageDto = {
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string().required(),
  }),
};

module.exports = uploadImageDto;
