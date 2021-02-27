import { Request, Response } from 'express';
import IUser from '../models/user/types';
import { GenerateAccessTokenType } from '../utilities';

export type ControllerType = (req: Request, res: Response) => Promise<void>;
export type UidType = Pick<IUser, 'uid'>;
export interface IToken {
  accessToken: ReturnType<GenerateAccessTokenType>;
  refreshToken: string;
}
