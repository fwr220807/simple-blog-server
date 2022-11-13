import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Role } from '../enum'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user
    // 需要用生成 roles 的装饰器所用的方法 + 控制器才能获取信息
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])

    // 判断守卫是否带了角色，没有则直接通过，有则判断当前用户角色是否符合守卫的角色
    return roles.length ? roles.some((role) => user.role === role) : true
  }
}
