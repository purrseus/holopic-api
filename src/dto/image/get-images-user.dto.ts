import { Segments, Joi } from 'celebrate';

const getImagesUserDto = {
  [Segments.QUERY]: Joi.object().keys({
    userId: Joi.string().required(),
    page: Joi.number().integer().min(1).required(),
  }),
};

export default getImagesUserDto;
