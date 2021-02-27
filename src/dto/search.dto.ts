import { Segments, Joi } from 'celebrate';

const searchDto = {
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
    page: Joi.number().integer().min(1).required(),
  }),
};

export default searchDto;
