import { cn } from "@/lib/utils/cn";

interface propsType {
  children: JSX.Element;
  className?: string;
}
export const Main = ({ children, className }: propsType) => {
  return <main className={cn("p-4", className)}>{children}</main>;
};
