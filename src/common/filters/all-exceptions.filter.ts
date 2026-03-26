import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const r = exception.getResponse();

      // Nest có thể trả string hoặc object
      if (typeof r === 'string') {
        message = r;
      } else if (typeof r === 'object' && r) {
        const obj: any = r;
        // validation pipe thường trả message là array
        message = obj.message ?? obj.error ?? 'Request error';
        details = obj;
      }
    } else {
      // có thể log exception ở đây nếu muốn
      message = 'Internal server error';
      details = { raw: String(exception) };
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      details: status >= 500 ? undefined : details, // prod thường không trả details cho 500
    });
  }
}
