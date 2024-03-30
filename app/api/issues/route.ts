import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import authOptions from "@/lib/auth";
import { issueSchema } from "@/schema/validationSchema";
import { getServerSession } from "next-auth";

export default async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await req.json()
  const validation = issueSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newIssues = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    }
  })

  return NextResponse.json(newIssues, { status: 201 })
}
