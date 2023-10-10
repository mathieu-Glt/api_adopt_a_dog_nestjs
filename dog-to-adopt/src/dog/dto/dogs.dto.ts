import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_adopted: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly breed: string; // race
}