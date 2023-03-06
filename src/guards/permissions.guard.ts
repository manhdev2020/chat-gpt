import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from '@root/config/enum/permission.enum';
import { PERMISSIONS_KEY } from '@root/decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const { user }: any = context.switchToHttp().getRequest<Request>();

    if (!requiredPermissions.length) {
      return true;
    }

    return requiredPermissions.every((permission) => {
      return user.permissions.some((item: any) => item.name === permission);
    });
  }
}
