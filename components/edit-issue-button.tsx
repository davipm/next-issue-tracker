import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button className="hover:cursor-pointer">
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
}
