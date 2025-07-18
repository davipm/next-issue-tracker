"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

type Data = {
  label: "Open" | "In Progress" | "Closed";
  value: number;
};

export function IssueChart({ open, closed, inProgress }: Props) {
  const data: Data[] = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: "var(--accent-9)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
