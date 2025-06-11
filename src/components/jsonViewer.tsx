import type React from "react";
import { Button } from "./ui/button";

interface JsonViewerProps {
  jsonData: string;
  onCopy?: () => void;
  onDownload?: () => void;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  jsonData,
  onCopy,
  onDownload,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonData);
    onCopy?.();
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-request-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Request JSON</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-96 overflow-auto">
        <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
          {jsonData || "No data to display"}
        </pre>
      </div>
    </div>
  );
};
