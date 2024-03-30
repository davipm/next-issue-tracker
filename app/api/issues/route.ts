import { NextRequest, NextResponse as res } from "next/server";
import { db } from "@/lib/db";
import authOptions from "@/lib/auth";
import { issueSchema } from "@/schema/validationSchema";
import { getServerSession } from "next-auth";

export default async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return res.json({}, { status: 401 });

  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) return res.json(validation.error.format(), { status: 400 });

  const newIssues = await db.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return res.json(newIssues, { status: 201 });
}
