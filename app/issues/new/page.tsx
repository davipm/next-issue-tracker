import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/components/issue-form-skeleton";

const IssueForm = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function Page() {
  return <IssueForm />;
}
