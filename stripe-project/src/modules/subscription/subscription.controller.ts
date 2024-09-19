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
  
  @Get('/checkout_sessions')
  async getSession(
    @Req() req,
  ): Promise<{ status: string; customer_email: string } | undefined> {
    try {
      const session = await this.subscriptionService.retrieveSession(
        req.query.session_id,
      );
      return {
        status: session.status,
        customer_email: session.customer_email,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Post('/checkout_sessions')
  createSubscriptionSession(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionService.createSubscriptionSession(
      createSubscriptionDto.user,
      createSubscriptionDto.priceId,
      createSubscriptionDto.trial,
    );
  }
}
