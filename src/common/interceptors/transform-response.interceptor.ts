import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from './response-message.decorator';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const res = httpCtx.getResponse();
    const req = httpCtx.getRequest();

    const customMessage =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ||
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getClass());

    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          data.success === true &&
          'statusCode' in data
        ) {
          return data;
        }

        return {
          success: true,
          statusCode: res.statusCode,
          message: customMessage || 'OK',
          data,
          path: req.originalUrl,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
