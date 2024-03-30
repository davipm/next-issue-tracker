import { NextResponse as res } from "next/server";
import { db } from "@/lib/db";

export default async function GET() {
  const users = await db.user.findMany({
    orderBy: { name: "asc" },
  });

  return res.json(users);
}
