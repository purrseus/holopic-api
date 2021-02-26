const { Segments, Joi } = require('celebrate');

const editImageDto = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    tags: Joi.array(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

module.exports = editImageDto;
