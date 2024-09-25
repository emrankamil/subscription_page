"use client";

import { useSession } from "next-auth/react";

export const useUpdateSession = () => {
  const { data: session, update } = useSession();
  const updateSession = async (key: string, value: any) => {
    if (session) {
      // Update the session object
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          [key]: value,
        },
      };

      // Call the update method to update the session
      update(updatedSession);
    } else {
      // Handle case where session is not available (e.g., user not logged in)
      console.error("No session available. User might not be logged in.");
    }
  };

  return updateSession;
};
