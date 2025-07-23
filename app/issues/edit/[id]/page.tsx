import dynamic from "next/dynamic";
import { prismaClient } from "@/lib/db";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "@/components/issue-form-skeleton";

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default async function Page({ params }: Props) {
  const issue = await prismaClient.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
