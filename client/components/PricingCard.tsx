import BillingPlan from "@/types/biling_plans";
import Price from "@/types/price";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const PricingCard = ({
  billingPlan,
  isYearly,
}: {
  billingPlan: BillingPlan;
  isYearly: boolean;
}) => {

  const [price, setPrice] = React.useState<Price>();

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const priceId = isYearly ? billingPlan.prices.annualPriceId : billingPlan.prices.monthlyPriceId;
        const { data } = await axios.get(`http://localhost:3000/subscription/prices/${priceId}`);
        setPrice(data);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
  }, [isYearly, billingPlan.prices]);

  // POST request
  const handleSubscription = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3000/subscription/payment",
      {
      priceId: isYearly ? billingPlan.prices.annualPriceId : billingPlan.prices.monthlyPriceId,
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      }
      },
      {
      headers: {
        "Content-Type": "application/json",
      },
      }
    );
    console.log(data);
    window.location.assign(data.url);
  };

  return (
    <div className="border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
      <div>
        <div className="bg-gray-100 h-28 items-center font-bold">
          <h4 className="text-3xl">{billingPlan.title}</h4>
          <h3>{billingPlan.description}</h3>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="text-5xl font-bold">
              {price && (price.unit_amount / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
            <h3>Additional weight just $.05 / lb</h3>
          </div>
          <ul className="flex justify-center">
            <li className="text-xl font-bold">
              <div className="mt-6 space-y-4">
                {billingPlan.features.map((feature, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="flex space-x-3">
                        <AiFillCheckCircle
                          className="h-5 w-5 flex-shrink-0 text-green-500 ml-2"
                          aria-hidden="true"
                        />
                        <p className="text-sm text-gray-500">{feature}</p>
                      </div>
                      <div className="border" />
                    </React.Fragment>
                  );
                })}
              </div>
            </li>
          </ul>
          <button
            className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm"
            onClick={handleSubscription}
          >
            {billingPlan.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
