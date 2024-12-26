// app/actions.ts
"use server";

import dbConnect from "@/lib/mongoose";
import User from "@/mongoose-models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSession, verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function banUser() {
  const session = await verifySession();
}

export async function createUser(prevState: unknown, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["Male", "Female", "Unisex"]),
    age: z.preprocess(
      (val) => Number.parseInt(val as string, 10),
      z.number().min(0, "Age must be a positive number")
    ),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
  });

  const result = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    gender: formData.get("gender"),
    age: formData.get("age"),
    city: formData.get("city"),
    area: formData.get("area"),
  });

  console.log(result);

  if (!result.success) {
    return {
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, gender, age, city, area } = result.data;

  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "User with this email already exists.", errors: {} };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      location: {
        city,
        area,
      },
    });

    await user.save();
    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return { message: "Error creating user", errors: {} };
  }
  return redirect("/");
}
