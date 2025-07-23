import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { IssueQuery, columnsNames, IssueTable } from "@/components/issue-table";
import { prismaClient } from "@/lib/db";
import { IssueActions } from "@/components/issue-actions";
import { Pagination } from "@/components/pagination";

interface Props {
  searchParams: IssueQuery;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default async function Page({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = { status };

  const orderBy = columnsNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prismaClient.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    // include: { assignedToUser: true },
  });

  const issueCount = await prismaClient.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
}
