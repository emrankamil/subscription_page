'use client'

import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function Home() {
  // const fetchClientSecret = useCallback(() => {
  //   // Create a Checkout Session
  //   return fetch("/http://localhost:3000/checkout_sessions", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.clientSecret);
  // }, []);

  const options = { clientSecret: "cs_test_a11D4Ecjfux7HjzunyALYBfYPV3eSTobhuLDTvKyFKtCGmcu8Egu5Tcq5t_secret_fid2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ3BsSGphYCc%2FJ2BoZ2BhYWBhJyknaWR8anBxUXx1YCc%2FJ3Zsa2JpYFpscWBoJyknd2BhbHdgZnFKa0ZqaHVpYHFsamsnPydkaXJkfHYnKSdnZGZuYndqcGthRmppancnPycmY2NjY2NjJ3gl" };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
