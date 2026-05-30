import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  menuId!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}