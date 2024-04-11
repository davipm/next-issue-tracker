import { cache } from "react";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { IssueDetails } from "@/components/issues/issue-details";
import { AssigneeSelect } from "@/components/issues/assignee-select";
import { EditIssueButton } from "@/components/edit-issue-button";
import { DeleteIssueButton } from "@/components/delete-issue-button";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => db.issue.findUnique({ where: { id: issueId } }));

export async function generateMetadata({ params }: Props) {
  console.log({ id: params.id });
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.description}`,
  };
}

export default async function Page({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}
