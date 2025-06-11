import type React from "react";
import { Textarea } from "./ui/textArea";

interface JsonBodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const JsonBodyEditor: React.FC<JsonBodyEditorProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="body" className="text-sm font-medium text-gray-700">
          Request Body (JSON)
        </label>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
      <Textarea
        id="body"
        placeholder={`{
  "key": "value",
  "array": [1, 2, 3],
  "nested": {
    "property": "value"
  }
}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        className="min-h-[200px] font-mono text-sm"
      />
      <p className="text-xs text-gray-500">
        Enter valid JSON data for the request body
      </p>
    </div>
  );
};
