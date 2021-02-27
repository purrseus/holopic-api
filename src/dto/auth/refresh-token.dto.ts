import { Segments, Joi } from 'celebrate';

const refreshTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default refreshTokenDto;
