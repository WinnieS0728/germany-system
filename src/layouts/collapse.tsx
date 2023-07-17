interface collapseProp {
  main: JSX.Element;
  sub: JSX.Element;
  open: boolean;
}
export const Collapse = ({ main, sub, open }: collapseProp) => {
  return (
    <>
      <div className='header'>{main}</div>
      <div
        className='bottom'
        style={{
          height: open ? "auto" : 0,
          overflowY: "hidden",
        }}
      >
        {sub}
      </div>
    </>
  );
};
