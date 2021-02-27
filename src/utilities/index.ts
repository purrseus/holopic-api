import jwt from 'jsonwebtoken';

interface IPayload {
  uid: string;
}

export type GenerateAccessTokenType = (pyload: IPayload) => string;

export const generateAccessToken: GenerateAccessTokenType = payload => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY || 'env', {
    expiresIn: '1h',
  });
};
