import { Segments, Joi } from 'celebrate';

const editProfileDto = {
  [Segments.BODY]: Joi.object().keys({
    fullName: Joi.string().min(0).max(64),
    username: Joi.string().min(4).max(32),
    gender: Joi.string().valid('N/A', 'MALE', 'FEMALE'),
    bio: Joi.string().min(0).max(255),
    location: Joi.string().min(0).max(255),
  }),
};

export default editProfileDto;
