import { Segments, Joi } from 'celebrate';

const verifyFirebaseTokenDto = {
  [Segments.BODY]: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};

export default verifyFirebaseTokenDto;
