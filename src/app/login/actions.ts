// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import User from "@/mongoose-models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function loginUser(prevState: unknown, formData: FormData) {
  // Define schema for validation
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // Parse and validate form data
  const result = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      message: "Unknown error occurred",
      errors: result.error,
    };
  }

  const { email, password } = result.data;
  try {
    // Connect to the database
    await dbConnect();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found", errors: {} };
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { message: "Incorrect password", errors: {} };
    }
    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return { message: "Failed to log in", errors: {} };
  }
  return redirect("/");
}
