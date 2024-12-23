import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const H1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-xl font-semibold md:text-4xl", className)}>
      {children}
    </h1>
  );
};

export const H2 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-2xl md:text-3xl font-semibold", className)}>
      {children}
    </h2>
  );
};

export const H3 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h3 className={cn("text-2xl font-medium", className)}>{children}</h3>;
};

export const H4 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h4 className={cn("text-lg font-medium", className)}>{children}</h4>;
};

export const H5 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h4 className={cn("font-medium text-md", className)}>{children}</h4>;
};

export const P = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h2 className={cn("", className)}>{children}</h2>;
};
