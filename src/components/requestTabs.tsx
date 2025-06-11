"use client";

import type React from "react";
import { Tabs } from "./ui/tabs";
import { KeyValueTable } from "./keyValueTable";
import { JsonBodyEditor } from "./jsonBodyEditor";
import type { ApiRequest } from "../types/api";

interface RequestTabsProps {
  request: ApiRequest;
  activeTab: string;
  jsonError: string;
  onTabChange: (tabId: string) => void;
  onUpdateKeyValuePairs: (
    section: "params" | "headers" | "auth",
    id: string,
    field: "key" | "value",
    value: string
  ) => void;
  onAddKeyValuePair: (section: "params" | "headers" | "auth") => void;
  onRemoveKeyValuePair: (
    section: "params" | "headers" | "auth",
    id: string
  ) => void;
  onBodyChange: (value: string) => void;
}

export const RequestTabs: React.FC<RequestTabsProps> = ({
  request,
  activeTab,
  jsonError,
  onTabChange,
  onUpdateKeyValuePairs,
  onAddKeyValuePair,
  onRemoveKeyValuePair,
  onBodyChange,
}) => {
  const tabs = [
    {
      id: "params",
      label: "Params",
      content: (
        <KeyValueTable
          section="params"
          items={request.params}
          title="Query Parameters"
          onUpdateItem={onUpdateKeyValuePairs}
          onAddItem={onAddKeyValuePair}
          onRemoveItem={onRemoveKeyValuePair}
        />
      ),
    },
    {
      id: "auth",
      label: "Auth",
      content: (
        <KeyValueTable
          section="auth"
          items={request.auth}
          title="Authorization Headers"
          onUpdateItem={onUpdateKeyValuePairs}
          onAddItem={onAddKeyValuePair}
          onRemoveItem={onRemoveKeyValuePair}
        />
      ),
    },
    {
      id: "headers",
      label: "Headers",
      content: (
        <KeyValueTable
          section="headers"
          items={request.headers}
          title="Request Headers"
          onUpdateItem={onUpdateKeyValuePairs}
          onAddItem={onAddKeyValuePair}
          onRemoveItem={onRemoveKeyValuePair}
        />
      ),
    },
    {
      id: "body",
      label: "Body",
      content: (
        <JsonBodyEditor
          value={request.body}
          onChange={onBodyChange}
          error={jsonError}
        />
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      className="w-full"
    />
  );
};
