"use client";

import Link from "next/link";
import { Button } from "@radix-ui/themes";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <p>EditIssueButton</p>
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
}
