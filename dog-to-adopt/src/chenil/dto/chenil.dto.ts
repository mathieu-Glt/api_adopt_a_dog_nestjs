import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateChenilDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly capacity?: number; 

  @IsArray()
  @IsNotEmpty({ each: true })
  readonly doggos: string[];

}