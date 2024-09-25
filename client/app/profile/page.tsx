"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useUpdateSession } from "../utils/updateSession";

const ProfilePage = () => {
  const [newUsername, setNewUsername] = useState<string>("");

  const updateSession = useUpdateSession();
  const { data: session } = useSession();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSession("username", newUsername);
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-lg">
          <strong>User Name:</strong> {session?.user.username}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {session?.user.email}
        </p>
      </div>
      <div>
        <form onSubmit={handleUpdate} className="mt-4">
          <label className="block text-lg font-medium mb-2" htmlFor="username">
            New Username:
          </label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Update Username
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
