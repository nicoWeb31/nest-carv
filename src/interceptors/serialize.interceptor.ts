import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor{
    new (...args: any[]) : {}
}
export function Serialize(dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(
        context: ExecutionContext,
        handler: CallHandler,
    ): Observable<any> {
        //run something before req
        //by the request handler

        // console.log("i'm running before the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                //run something before the response send out
                // console.log("i'm runnig before response is sent out ", data)
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
