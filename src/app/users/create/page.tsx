// app/users/create/page.tsx
"use client";

import React, { useActionState } from "react";
import { createUser } from "./action";

export default function UserForm() {
  const [data, action, isPending] = useActionState(createUser, undefined);
  const { name, email, password, gender, age, city, area } =
    data?.fieldData?.result?.data || {};

  return (
    <div>
      <h1>Create User</h1>
      <form action={action} className="p-5">
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={name}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            defaultValue={email}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            defaultValue={password}
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" required defaultValue={gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            min="0"
            required
            defaultValue={age}
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            required
            defaultValue={city}
          />
        </div>

        {/* Area */}
        <div>
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            name="area"
            id="area"
            required
            defaultValue={area}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="btn btn-success text-white"
        >
          {isPending ? "Adding User..." : "Add User"}
        </button>
        {data?.message && (
          <span style={{ color: "green" }}>{data?.message}</span>
        )}

        {data?.errors && (
          <span style={{ color: "red" }}>{data?.errors.toString()}</span>
        )}
      </form>
    </div>
  );
}
