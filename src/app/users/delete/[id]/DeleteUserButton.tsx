// app/users/[id]/DeleteUserButton.tsx
"use client";

import React from "react";
import { deleteUser } from "./action";

export default function DeleteUserButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const result = await deleteUser(userId);
      alert(result.message);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete User
    </button>
  );
}
