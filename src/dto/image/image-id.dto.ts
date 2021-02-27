import { Segments, Joi } from 'celebrate';

const imageIdDto = {
  [Segments.PARAMS]: Joi.object().keys({
    imageId: Joi.string().required(),
  }),
};

export default imageIdDto;
