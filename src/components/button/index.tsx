import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children }: ButtonProps) {
  return (
    <button
      className="text-white font-bold bg-linear-180 
         from-green-400 to-emerald-600 w-full rounded-4xl py-1.5
         text-2xl hover:-translate-y-1 flex items-center justify-center gap-2
         duration-400 transition-all active:opacity-80 mt-2.5 "
    >
      {children}
    </button>
  );
}
