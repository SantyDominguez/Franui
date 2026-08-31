import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return <main className={cn("mx-auto w-full max-w-2xl px-5 pb-28", className)}>{children}</main>;
}
