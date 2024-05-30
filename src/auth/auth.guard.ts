import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class Authorization implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    /**@TODO : Add JWT or oAuth authentication */
    if (!authorization || authorization !== process.env.STATIC_AUTH_TOKEN) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }
    return true;
  }
}
