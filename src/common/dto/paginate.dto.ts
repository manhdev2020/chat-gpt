import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginateDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  page!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  limit!: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
