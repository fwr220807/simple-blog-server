import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}
