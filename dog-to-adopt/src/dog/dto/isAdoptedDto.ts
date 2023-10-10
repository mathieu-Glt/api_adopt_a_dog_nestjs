import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AdoptValueDto {

  @IsNotEmpty()
  readonly is_adopted: boolean;

}