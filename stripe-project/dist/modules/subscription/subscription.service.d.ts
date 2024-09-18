import Stripe from 'stripe';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class SubscriptionService {
    private stripe;
    constructor(stripe: Stripe);
    createSubscriptionSession(user: CreateUserDto, priceId: string): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined>;
}
