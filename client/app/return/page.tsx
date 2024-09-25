"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUpdateSession } from "../utils/updateSession";

export default function Return() {
  const [stripeStatus, setStripeStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [isUpdated, setIsUpdate] = useState(false);
  const [isError, setIsError] = useState(false);

  const { data: session, status } = useSession();
  const updateSession = useUpdateSession();

  useEffect(() => {
    if (!session || isUpdated) return;

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const jwtToken = session.token;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/subscription/checkout_sessions?session_id=${sessionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStripeStatus(data.status);
        setCustomerEmail(data.customer_email);

        if (data.status === "open") {
          return redirect("/pricing");
        }
        if (data.status === "complete" && data.updatedSubscription) {
          updateSession("subscription", data.updatedSubscription);
          setIsUpdate(true);
        }
      } catch (error) {
        setIsError(true); // Update error state
        console.error("Error fetching subscription data:", error); // Log the error
      }
    };

    fetchData();
  }, [status]);

  console.log("status", status);
  console.log("stripeStatus", stripeStatus);

  if (isError || stripeStatus === "open") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>There was an unexpected error. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      {(status === "loading" || !stripeStatus) && (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      )}

      {stripeStatus === "complete" && (
        <section
          id="success"
          className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6"
        >
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold text-[#f1592a] mb-4">
              Success!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We appreciate your business! A confirmation email will be sent to{" "}
              <span className="font-medium text-[#f1592a]">
                {customerEmail}
              </span>
              . If you have any questions, please email{" "}
              <a
                href="mailto:orders@example.com"
                className="text-blue-500 hover:underline"
              >
                orders@example.com
              </a>
              .
            </p>
            <button className="mt-6 px-4 py-2 bg-[#f1592a] text-white font-medium rounded-md hover:bg-green-500 transition">
              <Link href={"/"}>Back to Home</Link>
            </button>
          </div>
        </section>
      )}

      {/* {stripeStatus === "open" && (
        <div className="flex items-center justify-center min-h-screen">
          <p>There was an unexpected error. Please try again.</p>
        </div>
      )} */}
    </div>
  );
}
