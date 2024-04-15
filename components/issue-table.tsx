import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

type Columns = {
  label: string;
  value: keyof Issue;
  className?: string;
};

const columns: Columns[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export default function IssueTable({ searchParams, issues }: Props) {
  return (
    <div>
      <p></p>
    </div>
  );
}
