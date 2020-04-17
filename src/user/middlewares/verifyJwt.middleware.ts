import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authenticationToken: string | string[] =
      req.headers['x-access-token'];

    const secret: string = process.env.SECRET;
    if (!authenticationToken)
      return res.send({ auth: false, message: 'No token provided' });
    verify(authenticationToken, secret, (err, decoded) => {
      if (err)
        return res.send({ auth: false, message: 'Failed to authenticate' });
      next();
    });
  }
}
