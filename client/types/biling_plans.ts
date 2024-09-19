type BillingPlan = {
  id: string;
  title: string;
  monthlyPrice: string;
  annualTotalPrice: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  prices: {monthlyPriceId: string, annualPriceId: string};
};

export default BillingPlan;