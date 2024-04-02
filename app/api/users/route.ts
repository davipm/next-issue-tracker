import { NextResponse as res, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const users = await db.user.findMany({
    orderBy: { name: "asc" },
  });

  return res.json(users);
}
