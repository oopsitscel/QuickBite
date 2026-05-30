export class OrderItemResponseDto {
  menuId!: string;
  name!: string;
  quantity!: number;
  price!: number;
  subtotal!: number;
}

export class OrderUserDto {
  id!: string;
  name!: string;
  email!: string;
}

export class OrderResponseDto {
  id!: string;
  status!: string;
  totalPrice!: number;
  createdAt!: Date;

  customer!: OrderUserDto;
  chef?: OrderUserDto;

  items!: OrderItemResponseDto[];
}