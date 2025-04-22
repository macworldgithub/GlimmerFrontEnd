import Link from "next/link";
import React from "react";

interface Props {
	description?: string;
}

const AboutSalon = ({ description }: Props) => {
	return (
		<>
			<div className="w-[99vw] p-4 sm:p-6 md:p-10 my-4 md:my-8">
				<div className="prose lg:prose-lg">
					<h2 className="mb-2 md:mb-3">About Salon</h2>
				</div>
				<p className="text-2xl">
					{description ||
						"No description provided."}
				</p>
			</div>
		</>
	);
};

export default AboutSalon;
