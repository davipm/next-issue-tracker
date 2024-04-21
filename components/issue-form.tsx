"use client";

import toast from "react-hot-toast";
import { z } from "zod";
import { issueSchema } from "@/schema/validationSchema";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { ErrorMessage } from "@/components/error-message";
import SimpleMDE from "react-simplemde-editor";
import { Spinner } from "@/components/Spinner";

type IssueFormData = z.infer<typeof issueSchema>;

export function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IssueFormData) => {
      if (issue) return axios.patch(`/api/issues/${issue.id}`, data);
      else return axios.post(`/api/issues/`, data);
    },
    onSuccess: async () => {
      router.refresh();
      router.push("/issues/list");
    },
    onError: () => {
      toast.error("Changes could not be saved.");
    },
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root>
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={handleSubmit((data) => mutate(data))}>
        <TextField.Root variant="surface" defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          name="description"
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Update issue..." : "Submit new Issue"} {isPending && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
