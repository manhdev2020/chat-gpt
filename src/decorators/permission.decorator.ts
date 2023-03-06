import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export const Permission = (...permissions: string[]): CustomDecorator =>
  SetMetadata(PERMISSIONS_KEY, permissions);
