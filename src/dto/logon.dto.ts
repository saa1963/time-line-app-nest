import { ApiProperty } from '@nestjs/swagger';

export class LogonDto {
  @ApiProperty()
  Login: string;
  @ApiProperty()
  Password: string;
}
