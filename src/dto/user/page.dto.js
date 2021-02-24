const { Segments, Joi } = require('celebrate');

const pageDto = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
  }),
};

module.exports = pageDto;
