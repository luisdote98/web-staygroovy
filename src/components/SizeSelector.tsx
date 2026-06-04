"use client";

interface Props {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
  small?: boolean;
}

export default function SizeSelector({ sizes, selected, onChange, small }: Props) {
  return (
    <div className="flex gap-1.5">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`border font-medium transition-all duration-150 ${
            small ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-[11px]"
          } ${
            selected === s
              ? "border-[#c9a84c] bg-[#c9a84c] text-[#0a0a0a]"
              : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
