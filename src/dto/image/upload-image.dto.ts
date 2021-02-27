import { Segments, Joi } from 'celebrate';

const uploadImageDto = {
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string().required(),
  }),
};

export default uploadImageDto;
