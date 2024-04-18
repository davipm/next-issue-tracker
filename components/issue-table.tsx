import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";

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

export const columnsNames = columns.map((column) => column.value);

export default function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.label,
                  },
                }}
              >
                {column.label}
              </NextLink>

              {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
    </Table.Root>
  );
}
