import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Found at https://stackoverflow.com/questions/72167686/how-to-default-format-response-when-statuscode-is-200-or-another-successful-one

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value = value ? value : [];
        return { status: 'success', data: [value] };
      }),
    );
  }
}
