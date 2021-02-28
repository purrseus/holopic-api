import { Segments, Joi } from 'celebrate';

const changeAvatarDto = {
  [Segments.BODY]: Joi.object().keys({
    publicId: Joi.string().required(),
  }),
};

export default changeAvatarDto;
