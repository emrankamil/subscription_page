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

  async getPriceById(
    id: any,
  ): Promise<Stripe.Response<Stripe.Price> | undefined> {
    try {
      return await this.stripe.prices.retrieve(id);
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }

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
    trial: boolean,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      const existingCustomers = await this.stripe.customers.list({
        email: user.email,
      });

      let customer;
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        // Otherwise, create a new customer
        customer = await this.stripe.customers.create({
          name: user.name,
          email: user.email,
        });
      }

      // await this.usersService.updateCustomerId(user.id, customer.id);

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        customer: customer.id,
        line_items: [
          {
        price: priceId,
        quantity: 1,
          },
        ],
        mode: 'subscription',
        ui_mode: 'embedded',
        return_url:
          'http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}',
        // success_url: 'http://localhost:3000',
        // cancel_url: 'http://localhost:3000/subscription/prices',
      };

      if (trial) {
        sessionParams.subscription_data = {
          trial_period_days: 30,
        };
      }

      return this.stripe.checkout.sessions.create(sessionParams);
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }

  async retrieveSession(
    session_id: string,
  ): Promise<{ status: string; customer_email: string } | undefined> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(session_id);
      return {
        status: session.status,
        customer_email: session.customer_details.email,
      };
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }
}
