// app/users/create/page.tsx
"use server";
import React from "react";
import dbConnect from "@/lib/mongoose";
import User from "@/mongoose-models/User";
import { updateUser } from "./action";

interface Params {
	id: string;
}

export default async function UserForm({
	params,
}: {
	params: Promise<Params>;
}) {
	const { id } = await params;

	await dbConnect();
	const user = await User.findById(id);

	return (
		<div>
			<h1>Update User</h1>
			<form
				action={async function (formData: FormData) {
					"use server";
					updateUser(id, formData);
				}}
				className="p-5"
			>
				{/* Name */}
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						id="name"
						required
						defaultValue={user?.name}
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
						defaultValue={user?.email}
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
						defaultValue={user?.password}
					/>
				</div>

				{/* Gender */}
				<div>
					<label htmlFor="gender">Gender:</label>
					<select
						name="gender"
						id="gender"
						required
						defaultValue={user?.gender}
					>
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
						defaultValue={user?.age}
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
						defaultValue={user?.location?.city}
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
						defaultValue={user?.location?.area}
					/>
				</div>

				<button type="submit" className="btn btn-success text-white">
					Update User
				</button>
			</form>
		</div>
	);
}
