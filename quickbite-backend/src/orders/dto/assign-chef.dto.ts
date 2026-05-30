import { IsNotEmpty, IsString } from 'class-validator';

export class AssignChefDto {
  @IsNotEmpty()
  @IsString()
  chefId!: string;
}