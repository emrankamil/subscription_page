"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SubscriptionStatus = () => {
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  // Access subscription data from the session
  const subscription = session?.user.subscription;
  // console.log("subscription", subscription);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Subscription Status
      </h2>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">Plan:</strong>{" "}
          <span className="text-gray-900">{subscription?.name}</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">Storage:</strong>{" "}
          <span className="text-gray-900">
            {subscription?.occupiedStorageMB} MB
          </span>{" "}
          used of{" "}
          <span className="text-gray-900">{subscription?.storageMB} MB</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">Seats:</strong>{" "}
          <span className="text-gray-900">{subscription?.occupiedSeats}</span>{" "}
          of <span className="text-gray-900">{subscription?.seats}</span> seats
          occupied
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">Status:</strong>{" "}
          <span
            className={
              subscription?.isActive ? "text-green-500" : "text-red-500"
            }
          >
            {subscription?.isActive ? "Active" : "Inactive"}
          </span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">
            Period Starts At:
          </strong>{" "}
          <span className="text-gray-900">
            {subscription?.periodStartsAt
              ? new Date(subscription?.periodStartsAt).toLocaleDateString()
              : "N/A"}
          </span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">
            Period Ends At:
          </strong>{" "}
          <span className="text-gray-900">
            {subscription?.periodEndsAt
              ? new Date(subscription?.periodEndsAt).toLocaleDateString()
              : "N/A"}
          </span>
        </p>
      </div>

      <div>
        <p className="text-lg">
          <strong className="font-semibold text-gray-600">
            Has Been Free Trial:
          </strong>{" "}
          <span className="text-gray-900">
            {subscription?.hasBeenFreeTrial ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
