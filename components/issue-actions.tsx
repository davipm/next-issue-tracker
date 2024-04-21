import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { IssueStatusFilter } from "@/components/issue-status-filter";

export function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}
