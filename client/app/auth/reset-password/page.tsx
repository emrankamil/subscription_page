"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetId = searchParams.get("resetId");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetId,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
