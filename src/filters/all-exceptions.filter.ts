import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
import { GlobalResponseError } from './global.response.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message.message;
        let code = 'HttpException';

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                message = (exception as HttpException).message;
                break;
            case QueryFailedError:
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as QueryFailedError).message;
                code = (exception as any).code;
                break;
            case EntityNotFoundError:
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as EntityNotFoundError).message;
                code = (exception as any).code;
                break;
            case CannotCreateEntityIdMapError:
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as CannotCreateEntityIdMapError).message;
                code = (exception as any).code;
                break;
            case UnauthorizedException:
                status = (exception as UnauthorizedException).getStatus();
                message = (exception as UnauthorizedException).message;
                break;
            case BadRequestException:
                status = (exception as BadRequestException).getStatus();
                message = (exception as BadRequestException).getResponse();
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = (exception as Error).message;
                Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);
        }

        response.status(status).json(GlobalResponseError(status, message, code, request));
    }
}
