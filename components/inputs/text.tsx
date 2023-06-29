interface TextInputProps {
  label: string
  value: string
  setValue: (value: string) => void
}

export function TextInput({ label, value, setValue }: TextInputProps) {
  return (
    <div className="w-1/2 flex items-baseline space-x-2">
      <span><strong>{label}</strong>:</span>
      <input
        className="border border-gray-300 rounded px-2 py-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
