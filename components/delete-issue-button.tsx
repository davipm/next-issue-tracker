"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// import { Container } from "./styles";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      <p>DeleteIssueButton</p>
    </div>
  );
}
