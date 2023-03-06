import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { path, user, body, query } = request;

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `logging\n${request.method} ${path} time : ${
              Date.now() - request.now
            }ms\nuser : ${JSON.stringify(user)}\nbody : ${JSON.stringify(
              body,
            )}\nquery : ${JSON.stringify(query)}`,
          ),
        ),
      );
  }
}
