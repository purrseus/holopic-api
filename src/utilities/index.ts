import jwt from 'jsonwebtoken';

interface IPayload {
  uid: string;
}

export type GenerateAccessTokenType = (payload: IPayload) => string;

export const generateAccessToken: GenerateAccessTokenType = payload => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};
