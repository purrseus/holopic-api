import { Segments, Joi } from 'celebrate';

const uidDto = {
  [Segments.PARAMS]: Joi.object().keys({
    uid: Joi.string().required(),
  }),
};

export default uidDto;
