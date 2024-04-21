import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const issue = await db.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>Edit</p>
    </div>
  );
}
