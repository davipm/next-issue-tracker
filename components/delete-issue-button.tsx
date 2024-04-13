"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  // const queryClient = useQueryClient();

  const [error, setError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/issues/${issueId}`);
    },
    onSuccess: async () => {
      router.refresh();
      router.push("/issues/list");
    },
    onError: () => {
      setError(true);
    },
  });

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isPending}>
            Delete Issue
            {isPending && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>

          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => mutate()}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>

          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
