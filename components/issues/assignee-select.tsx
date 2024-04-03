"use client";

import axios from "axios";
import { Issue, User } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

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

  const { mutate } = useMutation({
    mutationFn: (userId: string) => {
      return axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
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

  // TODO: update loading
  if (isLoading) return <div>Loading</div>;

  if (error) return null;

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={mutate}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
