"use client";

import axios from "axios";
import { useState } from "react";
import { Issue } from "@prisma/client";

export function AssigneeSelect({ issue }: { issue: Issue }) {
  const [item, setItem] = useState(null);

  return (
    <div>
      <p>AssigneeSelect</p>
    </div>
  );
}
