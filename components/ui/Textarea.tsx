import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eau-400 focus:border-eau-400 transition-all duration-300 ${
          error ? "border-red-400 bg-red-50" : "border-eau-100 bg-eau-50/30 hover:bg-eau-50/50"
        } ${className}`}
        style={{ borderRadius: '1.5rem' }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
