import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class SubscriptionService {
  constructor(@InjectStripeClient() private stripe: Stripe) {}

  async createSubscriptionSession(
    user: CreateUserDto,
    priceId: string, // change it to your dto with validations
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      return this.stripe.checkout.sessions.create({
        success_url: 'https://example.com/',
        customer: user.customerId, 
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        ui_mode: 'embedded',
      });
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }
}
