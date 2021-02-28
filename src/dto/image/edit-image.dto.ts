import { Segments, Joi } from 'celebrate';

const editImageDto = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    tags: Joi.string().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

export default editImageDto;
