"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";

const ShowUser = () => {
  const credentials = useSelector((state: RootState) => state.login);

  return (
    <div className="flex justify-center items-center gap-2 font-sans text-[16px] max-md:hidden">
      {credentials?.token?.length > 0 ? (
        <p className="font-semibold">Welcome, {credentials?.name}</p>
      ) : (
        <>
          <Image src="/user.svg" width={25} height={25} alt="user" />
          <Link href="/login">
            <p className="hover:font-semibold">Login</p>
          </Link>
          <p>/</p>
          <Link href="/signup">
            <p className="hover:font-semibold">SignUp</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default ShowUser;
