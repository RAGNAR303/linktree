import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children }: LabelProps) {
  return <label className=" text-white py-2 font-medium">{children}</label>;
}
