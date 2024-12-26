// app/user/[id]/page.tsx
import dbConnect from "@/lib/mongoose";
import User from "@/mongoose-models/User";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export default async function OneUser({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  // Connect to the database
  await dbConnect();

  // Find user by id
  const user = await User.findById(id).lean();

  // If user is not found, render a 404 page
  if (!user) {
    notFound();
  }

  // Convert MongoDB fields to string for serialization
  const serializedUser = {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
  };

  // Render user details
  return (
    <>
      <h1>User Details</h1>
      <p>Name: {serializedUser.name}</p>
      <p>Email: {serializedUser.email}</p>
    </>
  );
}
