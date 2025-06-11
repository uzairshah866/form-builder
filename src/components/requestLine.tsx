"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { HTTP_METHODS } from "../constants";
import type { HttpMethod } from "../types/api";

interface RequestLineProps {
  method: HttpMethod;
  url: string;
  onMethodChange: (method: HttpMethod) => void;
  onUrlChange: (url: string) => void;
  onSend: () => void;
}

export const RequestLine: React.FC<RequestLineProps> = ({
  method,
  url,
  onMethodChange,
  onUrlChange,
  onSend,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedMethod = HTTP_METHODS.find((m) => m.value === method);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* Merged Method Dropdown + URL Input */}
      <div className="flex-1 relative">
        <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
          {/* Method Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 min-w-[80px]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="mr-1">{selectedMethod?.label}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 z-10 w-32 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-1">
                  {HTTP_METHODS.map((methodOption) => (
                    <li key={methodOption.value}>
                      <button
                        type="button"
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                          method === methodOption.value
                            ? "bg-teal-50 text-teal-900"
                            : "text-gray-900"
                        }`}
                        onClick={() => {
                          onMethodChange(methodOption.value as HttpMethod);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {methodOption.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* URL Input */}
          <input
            type="text"
            placeholder="Enter request URL"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="flex-1 px-3 py-2 text-sm focus:outline-none bg-white"
          />

          {/* URL Icon */}
          <div className="flex items-center px-3 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Send Button */}
      <Button onClick={onSend} className="px-6">
        Send
      </Button>
    </div>
  );
};
