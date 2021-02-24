const { Segments, Joi } = require('celebrate');

const searchUserDto = {
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
    page: Joi.number().integer().min(1).required(),
  }),
};

module.exports = searchUserDto;
