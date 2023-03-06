import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoomChatDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
