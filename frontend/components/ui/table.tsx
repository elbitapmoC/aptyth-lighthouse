"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: Array<Record<string, React.ReactNode>>;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ headers, data, className, ...props }, ref) => {
    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn(
            "w-full border-collapse border border-border bg-background text-foreground",
            className
          )}
          {...props}
        >
          <thead>
            <tr className="bg-muted text-muted-foreground">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-sm font-medium border border-border"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "hover:bg-muted/50",
                  rowIndex % 2 === 0 ? "bg-muted/10" : "bg-background"
                )}
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm border border-border"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
