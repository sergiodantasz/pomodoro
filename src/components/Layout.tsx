import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="m-5 flex flex-col items-center gap-12">{children}</div>
  );
};
