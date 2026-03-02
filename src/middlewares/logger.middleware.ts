
import * as common from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@common.Injectable()
export class LoggerMiddleware implements common.NestMiddleware {
  constructor(@common.Inject(common.Logger) private readonly logger: common.LoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startTime = Date.now();
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
