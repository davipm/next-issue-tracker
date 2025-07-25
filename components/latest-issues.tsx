import { prismaClient } from "@/lib/db";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "@/components/issue-status-badge";

export async function LatestIssues() {
  const issues = await prismaClient.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>

      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar fallback="?" src={issue.assignedToUser.image!} size="2" radius="full" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
