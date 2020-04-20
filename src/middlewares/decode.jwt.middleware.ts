import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class DecodeJwt implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authenticationToken: string | string[] =
      req.headers['x-access-token'];
    const secret: string = process.env.SECRET;
    if (!authenticationToken) return next();

    verify(authenticationToken, secret, (err, decoded) => {
      if (err) return next();
      req.headers['user-id'] = decoded.id;
      next();
    });
  }
}
