"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const priceId = searchParams.get("priceId");
  const isTrial = searchParams.get("trial") === "true";
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!session) return;
      try {
        const { data } = await axios.post(
          "http://localhost:8080/subscription/checkout_sessions",
          {
            priceId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );
        // Store the clientSecret for the Stripe payment process
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
      }
    };

    if (priceId) {
      fetchClientSecret();
    }
  }, [priceId, session]);

  const options = { clientSecret };

  // Show loading state until clientSecret is retrieved
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentPage;
