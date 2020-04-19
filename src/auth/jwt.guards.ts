import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return this.verifyJwt(request);
  }

  verifyJwt(request: Request): boolean {
    const secret: string = process.env.SECRET;
    const authenticationToken: string | string[] =
      request.headers['x-access-token'];
    let result = true;

    if (!authenticationToken) result = false;
    verify(authenticationToken, secret, (err, decoded) => {
      if (err) result = false;
    });

    return result;
  }
}
