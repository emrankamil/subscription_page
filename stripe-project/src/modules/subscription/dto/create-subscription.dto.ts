import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

export class CreateSubscriptionDto {
  readonly priceId: string;
  readonly user: CreateUserDto;
}
