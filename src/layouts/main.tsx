interface propsType {
  children: JSX.Element;
}
export const Main = ({ children }: propsType) => {
  return <main className='p-4'>{children}</main>;
};
