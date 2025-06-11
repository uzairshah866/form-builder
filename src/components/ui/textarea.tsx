import type React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  className = "",
  error = false,
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 resize-vertical";
  const errorClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:border-teal-500 focus:ring-teal-500";

  return (
    <textarea
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
};
