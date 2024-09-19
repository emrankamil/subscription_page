"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import PricingCard from "@/components/PricingCard";
import Price from "@/types/price";
import BillingPlan from "@/types/biling_plans";

const billingPlans: BillingPlan[] = [
  {
    id: "1",
    title: "WAVIC FREE",
    monthlyPrice: "Free",
    annualTotalPrice: "-",
    description: "Basic plan perfect for personal use with limited resources.",
    features: ["5Gb storage", "1 Artist Space shared", "Basic collaboration tools", "Limited storage"],
    buttonText: "Start Free Trial",
    prices: { monthlyPriceId: "", annualPriceId: "" }
  },
  {
    id: "2",
    title: "WAVIC EXPLORER",
    monthlyPrice: "€4.99",
    annualTotalPrice: "€47.88",
    description: "Explore more with additional storage and space for small teams.",
    features: [
      "200Gb storage",
      "3 Artist Spaces shared",
      "Priority support",
      "Advanced collaboration tools",
      "Monthly insights & statistics",
    ],
    buttonText: "Subscribe",
    prices: {
      monthlyPriceId: "price_1Q0WYcIH5eXQuzQWcE9s73wl",
      annualPriceId: "price_1Q0Wa1IH5eXQuzQWQ30ZfaN7",
    }
  },
  {
    id: "3",
    title: "WAVIC PRO",
    monthlyPrice: "€12.99",
    annualTotalPrice: "€143.88",
    description: "Ideal for growing teams and professionals looking for unlimited storage and collaboration options.",
    features: [
      "2Tb storage",
      "Unlimited Artist Spaces",
      "Priority support",
      "Advanced insights & reports",
      "Custom branding options",
    ],
    buttonText: "Subscribe",
    prices: {
      monthlyPriceId: "price_1Q0Wd4IH5eXQuzQWmf1fIsuj",
      annualPriceId: "price_1Q0WdeIH5eXQuzQWDYR2gOWv",
    }
  },
  {
    id: "4",
    title: "WAVIC PREMIUM",
    monthlyPrice: "€17.99",
    annualTotalPrice: "€215.88",
    description: "Ideal for growing teams and professionals looking for unlimited storage and collaboration options.",
    features: [
      "4Tb storage",
      "Unlimited Artist Spaces",
      "Priority support",
      "Advanced insights & reports",
      "Custom branding options",
    ],
    buttonText: "Subscribe",
    prices: {
      monthlyPriceId: "price_1Q0WfFIH5eXQuzQWqiEg5wGL",
      annualPriceId: "price_1Q0WfyIH5eXQuzQWqbDdYrfC",
    }
  },
];



const Pricing = () => {
const [prices, setPrices] = useState<Price[]>([]);
const [isYearly, setIsYearly] = useState(false);

const handleToggle = (planType: string) => {
  setIsYearly(planType === "yearly");
};

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/subscription/prices"
    );
    setPrices(data["data"]);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl text-center mt-10 items-center">
        <h2 className="text-3xl font-semibold leading-7 text-[#f1592a]">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Choose the right WAVIC plan for you!
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
          Check out all the information below
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            !isYearly ? "bg-[#f1592a] text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            isYearly ? "bg-[#f1592a] text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto">
        {billingPlans.map((billingPlan: BillingPlan) => {
          if (isYearly && billingPlan.title === "WAVIC FREE") {
            return null;
          }
          return (
            <PricingCard billingPlan={billingPlan} key={billingPlan.id} isYearly={isYearly} />
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
