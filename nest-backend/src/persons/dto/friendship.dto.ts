import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FriendshipDto {
  @IsUUID()
  @ApiProperty({ description: 'Friends uuid' })
  uuid: string;
}
