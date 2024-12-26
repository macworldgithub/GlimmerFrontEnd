import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import User from "../../mongoose-models/User";
import Link from "next/link";

export default async function UserData() {
	await dbConnect();
	const users = await User.find({}, { password: 0 }).lean();

	if (!users || users.length === 0) {
		notFound();
	}

	return (
		<main>
			<h1>User List</h1>
			<ul>
				{users.map((user) => (
					<li key={user._id.toString()}>
						<Link href={`/users/${user._id}`}>
							<strong>{user.name}</strong> - {user.email}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
