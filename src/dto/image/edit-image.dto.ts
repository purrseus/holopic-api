import { Segments, Joi } from 'celebrate';

const editImageDto = {
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    tags: Joi.string().required(),
  }),
};

export default editImageDto;
