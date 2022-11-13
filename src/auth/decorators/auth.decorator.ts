// 聚合装饰器
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role } from '../enum'
import { RoleGuard } from '../guards/role.guard'

export function Auth(...roles: Role[]) {
  // SetMetadata 配置元信息，其他守卫可以使用该属性
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RoleGuard))
}
