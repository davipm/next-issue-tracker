import { NextResponse as res, NextRequest } from "next/server";
import { prismaClient } from "@/lib/db";

export async function GET(request: NextRequest) {
  const users = await prismaClient.user.findMany({
    orderBy: { name: "asc" },
  });

  return res.json(users);
}
