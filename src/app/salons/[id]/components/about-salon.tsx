import Link from "next/link";
import React from "react";

interface Props {
	description?: string;
}

const AboutSalon = ({ description }: Props) => {
	return (
		<>
			<div className="px-2 my-4 md:my-8">
				<div className="prose lg:prose-xl">
					<h2 className="mb-2 md:mb-3">About Salon</h2>
				</div>
				<p>
					{description ||
						"Full beauty range go high quality services. Russian-speaking masters, cosmetologist, an atmosphere of coziness and comfort. Only premium materials, high-level specialists- We value every guest- sign up and see for yourself."}
				</p>
			</div>
		</>
	);
};

export default AboutSalon;
