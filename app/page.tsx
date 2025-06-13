import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { IssueChart } from "@/components/issue-chart";
import { IssueSummary } from "@/components/issue-summary";
import { LatestIssues } from "@/components/latest-issues";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

async function getIssueStats() {
  const issueCounts = await db.issue.groupBy({
    by: ["status"],
    _count: true,
  });

  const open = issueCounts.find((issue) => issue.status === "OPEN")?._count || 0;
  const inProgress = issueCounts.find((issue) => issue.status === "IN_PROGRESS")?._count || 0;
  const closed = issueCounts.find((issue) => issue.status === "CLOSED")?._count || 0;

  return { open, inProgress, closed };
}

export default async function Home() {
  const { open, inProgress, closed } = await getIssueStats();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
