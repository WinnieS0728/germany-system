interface propsType {
  title: string;
  showJoyride?: boolean;
  joyrideStart?: () => void;
}
export const Header = ({ title, showJoyride, joyrideStart }: propsType) => {

  return (
    <header
      className={`flex items-center justify-between p-2 text-xl bg-sectionHeader text-myWhite`}
    >
      {title}
      {showJoyride && <button
        type='button'
        className='m-0 aspect-square w-8 rounded-full bg-yellow-500 p-0'
        onClick={() => {
          joyrideStart && joyrideStart();
        }}
      >
        ?
      </button>}
    </header>
  );
};
