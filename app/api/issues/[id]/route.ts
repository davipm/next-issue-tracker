import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { prismaClient } from "@/lib/db";
import { patchIssueSchema } from "@/schema/validationSchema";
import authOptions from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return res.json({}, { status: 401 });

  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return res.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prismaClient.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) return res.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prismaClient.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return res.json({ error: "Invalid issue" }, { status: 404 });
  }

  const updatedIssue = await prismaClient.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return res.json(updatedIssue);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return res.json({}, { status: 401 });

  const issue = await prismaClient.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return res.json({ error: "Invalid issue." }, { status: 400 });

  await prismaClient.issue.delete({ where: { id: issue.id } });

  return res.json({});
}
