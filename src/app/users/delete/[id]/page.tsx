// app/users/[id]/page.tsx
import React from "react";
import dbConnect from "@/lib/mongoose";
import User from "@/mongoose-models/User";
import { notFound } from "next/navigation";
import DeleteUserButton from "./DeleteUserButton";

interface Params {
  id: string;
}

export default async function UserPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  await dbConnect();
  const user = await User.findById(id).lean();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <DeleteUserButton userId={user._id.toString()} />
    </div>
  );
}
