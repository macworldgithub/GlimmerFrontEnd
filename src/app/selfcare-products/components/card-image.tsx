"use client";
import Link from "next/link";
import Image from "next/image";

const CardImage = ({ route, src }: { src: string; route: string }) => {
  return (
    <Link href={route} draggable="false">
      <Image
        src={src}
        alt="Product image"
        width={400}     // set an appropriate default width
        height={400}    // set an appropriate default height
        sizes="(max-width: 768px) 160px, (max-width: 1200px) 300px, 400px"
        className="cursor-pointer"
        draggable={false}
      />
    </Link>
  );
};

export default CardImage;
