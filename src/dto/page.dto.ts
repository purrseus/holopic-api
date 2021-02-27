import { Segments, Joi } from 'celebrate';

const getMyImagesDto = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
  }),
};

export default getMyImagesDto;
