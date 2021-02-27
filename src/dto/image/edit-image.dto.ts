import { Segments, Joi } from 'celebrate';

const editImageDto = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    tags: Joi.array().max(20),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

export default editImageDto;
