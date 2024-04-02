import ReactMarkdown from "react-markdown";
import { Heading, Card, Flex, Text } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import { IssueStatusBadge } from "@/components/issues/issue-status-badge";

export function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
