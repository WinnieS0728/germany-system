interface propsType {
  children: JSX.Element;
  className?: string;
}
export const Main = ({ children, className }: propsType) => {
  return <main className={`${className} p-4`}>{children}</main>;
};
