"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/issues/${issueId}`);
    },
    onSuccess: async () => {
      router.refresh();
      router.push("/issues/list");
    },
  });

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isPending} className="hover:cursor-pointer">
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
              <Button variant="soft" color="gray" className="hover:cursor-pointer">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => mutate()} className="hover:cursor-pointer">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={isError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>

          <AlertDialog.Cancel>
            <Button color="gray" variant="soft" mt="2">
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
