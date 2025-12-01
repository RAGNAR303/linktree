import type { ReactNode } from "react";

interface SocialProps {
  children: ReactNode;
  url: string;
}

export function Social({ children, url }: SocialProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {children}
    </a>
  );
}
