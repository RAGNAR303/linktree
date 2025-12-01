import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      className="font-medium bg-linear-180 from-white 
       to-gray-400 rounded-4xl py-2 px-5 w-full outline-1 
        outline-gray-700 "
      {...props}
    />
  );
}
