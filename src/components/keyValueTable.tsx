"use client";

import type React from "react";
import { Input } from "./ui/input";
import type { KeyValuePair } from "../types/api";

interface KeyValueTableProps {
  section: "params" | "headers" | "auth";
  items: KeyValuePair[];
  title: string;
  onUpdateItem: (
    section: "params" | "headers" | "auth",
    id: string,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => void;
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({
  section,
  items,
  onUpdateItem,
}) => {
  return (
    <div className="space-y-0 border border-gray-200 rounded-sm">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-0 border-b border-gray-200 bg-neutral-50">
        <div className="col-span-1 py-3 px-3 flex items-center border-r border-gray-200"></div>
        <div className="col-span-5 py-3 px-3 text-sm font-medium text-gray-700 border-r border-gray-200">
          Key
        </div>
        <div className="col-span-5 py-3 px-3 text-sm font-medium text-gray-700 border-r border-gray-200">
          Value
        </div>
        <div className="col-span-1 py-3 px-3 text-sm font-medium text-gray-700  flex justify-center">
          Bulk Edit
        </div>
      </div>

      {/* Table Rows */}
      <div>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-12 gap-0 hover:bg-gray-50 ${
              index !== items.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="col-span-1 py-2 px-3 flex items-center border-r border-gray-200"></div>

            {/* Key Input */}
            <div className="col-span-5 py-2 px-0 border-r border-gray-200">
              <Input
                placeholder="Key"
                value={item.key}
                onChange={(e) =>
                  onUpdateItem(section, item.id, "key", e.target.value)
                }
                className="h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300 focus:ring-1 rounded-none px-3"
              />
            </div>

            {/* Value Input */}
            <div className="col-span-5 py-2 px-0 border-r border-gray-200">
              <Input
                placeholder="Value"
                value={item.value}
                onChange={(e) =>
                  onUpdateItem(section, item.id, "value", e.target.value)
                }
                className="h-8 text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-gray-300 focus:ring-1 rounded-none px-3"
              />
            </div>

            <div className="col-span-1 py-2 px-3 flex items-center justify-center"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
