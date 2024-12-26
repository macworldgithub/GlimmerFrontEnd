"use client";
import Link from "next/link";

const CardImage = ({ route, src }: { src: string; route: string }) => {
	return (
		<Link href={route} draggable="false">
			<img src={src} alt={src} draggable="false" className="cursor-pointer" />
		</Link>
	);
};

export default CardImage;
