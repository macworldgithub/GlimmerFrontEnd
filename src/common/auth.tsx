"use server";

import { deleteSession } from "@/lib/session";

export const handleLogout = async () => {
  await deleteSession();
};
