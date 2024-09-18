import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
export declare class CreateSubscriptionDto {
    readonly priceId: string;
    readonly user: CreateUserDto;
}
