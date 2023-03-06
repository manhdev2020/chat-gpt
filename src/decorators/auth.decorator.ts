import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '@root/config/enum/permission.enum';
import { JwtAuthGuard } from '@root/guards/jwt-auth.guard';
import { PermissionsGuard } from '@root/guards/permissions.guard';
import { Permission } from './permission.decorator';

export function Auth(...permissions: Permissions[]) {
  return applyDecorators(
    Permission(...permissions),
    UseGuards(JwtAuthGuard, PermissionsGuard),
    ApiBearerAuth(),
  );
}
