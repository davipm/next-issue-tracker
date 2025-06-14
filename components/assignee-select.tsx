"use client";

import { useState } from "react";
import { Issue, User } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Callout, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Skeleton from "@/components/skeleton";

/**
 * Renders a select dropdown for assigning or unassigning a user to an issue.
 * Fetches available users, handles assignment updates via API, and displays loading or error states.
 *
 * @param issue - The issue object to assign a user to.
 * @returns A UI component for selecting an assignee.
 */
export function AssigneeSelect({ issue }: { issue: Issue }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // prettier-ignore
  const { data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ["users"],
    staleTime: 60 * 1000,
    retry: 3,
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
  });

  const [selectedUserId, setSelectedUserId] = useState(issue.assignedToUserId || "");

  const { mutate } = useMutation({
    mutationFn: (userId: string) => {
      // Only allow valid user IDs or "unassigned"
      const isValid = userId === "unassigned" || /^[a-zA-Z0-9\-]+$/.test(userId);
      return axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: isValid && userId !== "unassigned" ? userId : null,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      router.refresh();
      toast.success("User Assigned!");
    },
    onError: () => {
      toast.error("Changes could not be saved.");
    },
  });

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <Callout.Root color="red" role="alert">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>Access denied. Please contact the network administrator to view this page.</Callout.Text>
      </Callout.Root>
    );

  const handleChange = (value: string) => {
    setSelectedUserId(value);
    mutate(value === "unassigned" ? "" : value);
  };

  return (
    <>
      <Select.Root value={selectedUserId} onValueChange={handleChange}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}
