import { Body, Controller, Post, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import Stripe from 'stripe';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  createSubscriptionSession(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionService.createSubscriptionSession(
      createSubscriptionDto.user,
      createSubscriptionDto.priceId,
    );
  }
}
