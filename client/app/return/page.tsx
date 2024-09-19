'use client'

import  { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(
      `http://localhost:3000/subscription/checkout_sessions?session_id=${sessionId}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    alert("There was an unexpected error. Please try again.");
    return redirect("/pricing");
  }

  if (status === "complete") {
    return (
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
            <span className="font-medium text-[#f1592a]">{customerEmail}</span>.
            If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-500 hover:underline"
            >
              orders@example.com
            </a>
            .
          </p>
          <button
            className="mt-6 px-4 py-2 bg-[#f1592a] text-white font-medium rounded-md hover:bg-green-500 transition"
            
          >
            <Link href={"/"}>Back to Home</Link> 
          </button>
        </div>
      </section>
    );
  }

  return null;
}
