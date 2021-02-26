const { Segments, Joi } = require('celebrate');

const deleteImageDto = {
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

module.exports = deleteImageDto;
