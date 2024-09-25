import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { useUpdateSession } from "../utils/updateSession";

const ReturnPage = async () => {
  const session = await getServerSession(options);
  const updateSession = useUpdateSession();

  // Check if session exists; if not, redirect to signin
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const jwtToken = session.token;
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  let subscriptionStatus;
  let customerEmail;
  let updatedSubscription;

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    subscriptionStatus = data.status;
    customerEmail = data.customer_email;
    updatedSubscription = data.updatedSubscription;

    if (subscriptionStatus === "complete" && updatedSubscription) {
      updateSession("subscription", updatedSubscription);
    }
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    subscriptionStatus = "failed";
  }

  return (
    <div>
      <h1>Member Page</h1>
      {subscriptionStatus === "succeeded" ? (
        <div>
          <h2>Success!</h2>
          <p>Your subscription is active.</p>
          <p>Customer Email: {customerEmail}</p>
          <p>Updated Subscription: {JSON.stringify(updatedSubscription)}</p>
        </div>
      ) : (
        <div>
          <h2>Subscription Failed</h2>
          <p>There was an issue with fetching your subscription data.</p>
        </div>
      )}
    </div>
  );
};

export default ReturnPage;
