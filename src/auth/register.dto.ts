import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  Login: string;
  @ApiProperty()
  Email: string;
  @ApiProperty()
  Password1: string;
  @ApiProperty()
  Password2: string;
}
