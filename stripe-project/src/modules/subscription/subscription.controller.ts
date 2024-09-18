import { Body, Controller, Post, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import Stripe from 'stripe';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  createSubscriptionSession(
    @Req() request,
    @Body() priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
        return this.subscriptionService.createSubscriptionSession(
        request.user,
        priceId,
);
  }
}
