import { SubscriptionService } from './subscription.service';
import Stripe from 'stripe';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionController {
    private subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getPrices(): Promise<Stripe.Response<Stripe.ApiList<Stripe.Price>> | undefined>;
    createSubscriptionSession(createSubscriptionDto: CreateSubscriptionDto): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined>;
}
