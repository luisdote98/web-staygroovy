"use client";

interface Props {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
  small?: boolean;
  dark?: boolean; // true = botones sobre fondo oscuro (carrito, hover bar)
}

export default function SizeSelector({ sizes, selected, onChange, small, dark }: Props) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`border font-medium transition-all duration-150 ${
            small ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-[11px]"
          } ${
            selected === s
              ? "border-[#c9a84c] bg-[#c9a84c] text-[#0a0a0a]"
              : dark
              ? "border-white/20 text-white/55 hover:border-white/60 hover:text-white"
              : "border-[#0a0a0a]/20 text-[#0a0a0a]/55 hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
