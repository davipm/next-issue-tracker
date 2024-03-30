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

export default async function Home() {
  const open = await db.issue.count({
    where: { status: "OPEN" },
  });

  const inProgress = await db.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await db.issue.count({
    where: { status: "CLOSED" },
  });

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
