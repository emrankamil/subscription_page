import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    // private usersService: UsersService,
  ) {}

  async getPrices(): Promise<
    Stripe.Response<Stripe.ApiList<Stripe.Price>> | undefined
  > {
    try {
      return this.stripe.prices.list();
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }

  async createSubscriptionSession(
    user: CreateUserDto,
    priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      const customer = await this.stripe.customers.create({
        name: user.name,
        email: user.email,
      });

      // await this.usersService.updateCustomerId(user.id, customer.id);

      return this.stripe.checkout.sessions.create({
        // success_url: 'https://example.com/',
        customer: customer.id,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url: 'http://localhost:3000',
      });
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }
}
