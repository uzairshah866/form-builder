"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { RequestLine } from "./components/requestLine";
import { RequestTabs } from "./components/requestTabs";
import { JsonViewer } from "./components/jsonViewer";
import { Button } from "./components/ui/button";
import { useApiRequest } from "./hooks/useApiRequest";

export default function ApiTester() {
  const {
    request,
    jsonError,
    updateMethod,
    updateUrl,
    updateKeyValuePairs,
    addKeyValuePair,
    removeKeyValuePair,
    validateAndSetBody,
    saveAsJson,
    loadFromJson,
    loadFromStorage,
    generateJsonData,
  } = useApiRequest();

  const [activeTab, setActiveTab] = useState<string>("params");
  const [showJsonViewer, setShowJsonViewer] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Load saved data on component mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Auto-save when request changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveAsJson();
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [request, saveAsJson]);

  const handleSend = () => {
    if (jsonError) {
      alert("Please fix JSON errors before sending");
      return;
    }

    // Save current state as JSON
    const jsonData = saveAsJson();
    console.log("Sending request:", JSON.parse(jsonData || "{}"));
    alert("Request sent! Check console for details.");
  };

  const handleCopyJson = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadJson = () => {
    console.log("JSON downloaded successfully");
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (loadFromJson(content)) {
            alert("Request loaded successfully!");
          } else {
            alert("Error loading JSON file");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">API Tester</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowJsonViewer(!showJsonViewer)}
              >
                {showJsonViewer ? "Hide JSON" : "Show JSON"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleImportJson}>
                Import JSON
              </Button>
              <Button variant="outline" size="sm" onClick={saveAsJson}>
                {copySuccess ? "Saved!" : "Save JSON"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <RequestLine
            method={request.method}
            url={request.url}
            onMethodChange={updateMethod}
            onUrlChange={updateUrl}
            onSend={handleSend}
          />

          <RequestTabs
            request={request}
            activeTab={activeTab}
            jsonError={jsonError}
            onTabChange={setActiveTab}
            onUpdateKeyValuePairs={updateKeyValuePairs}
            onAddKeyValuePair={addKeyValuePair}
            onRemoveKeyValuePair={removeKeyValuePair}
            onBodyChange={validateAndSetBody}
          />

          {showJsonViewer && (
            <JsonViewer
              jsonData={generateJsonData()}
              onCopy={handleCopyJson}
              onDownload={handleDownloadJson}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
