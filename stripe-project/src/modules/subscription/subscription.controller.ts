import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import Stripe from 'stripe';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('/prices')
  getPrices(): Promise<
    Stripe.Response<Stripe.ApiList<Stripe.Price>> | undefined
  > {
    return this.subscriptionService.getPrices();
  }

  @Get('/prices/:id')
  getPriceById(@Req() req): Promise<Stripe.Response<Stripe.Price> | undefined> {
    const id = req.params.id;
    return this.subscriptionService.getPriceById(id);
  }

  @Post('/payment')
  createSubscriptionSession(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionService.createSubscriptionSession(
      createSubscriptionDto.user,
      createSubscriptionDto.priceId,
    );
  }
}
