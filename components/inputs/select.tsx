import { ReactNode } from "react";

interface SelectInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  children: ReactNode;
}

export function SelectInput({ label, value, setValue, children }: SelectInputProps) {
  return (
    <div className="w-1/2 flex items-baseline space-x-2">
      <span><strong>{label}</strong>:</span>
      <select
        className="border border-gray-300 rounded px-2 py-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {children}
      </select>
    </div>
  )
}
