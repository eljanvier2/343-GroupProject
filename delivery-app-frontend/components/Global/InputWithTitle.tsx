import React from "react";
import { Input } from "@/components/ui/input";

interface InputWithTitleProps {
  title: string;
  placeholder: string;
  type?:
    | "area"
    | "text"
    | "checkbox"
    | "radio"
    | "number"
    | "email"
    | "password"
    | "url"
    | "tel"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "color"
    | "file"
    | "image"
    | "range"
    | "search";
  onChange: (value: string) => void;
}

const InputWithTitle = ({
  title,
  placeholder,
  onChange,
  type = "text",
}: InputWithTitleProps): JSX.Element => {
  return (
    <div className="space-y-1.5">
      <div className="font-medium">{title}</div>
      {type === "area" ? (
        <textarea
        className="flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default InputWithTitle;
