import { useModalControl } from "@/hooks/modal control";
import { useScroll } from "@/hooks/scroll control";

interface modalProps {
  name: string;
  children: JSX.Element;
}

export const Modal = ({ name, children }: modalProps) => {
  const { canScroll } = useScroll();
  const [ isModalShow, toggleModal ] = useModalControl(name);

  if (isModalShow) {
    canScroll(false);
  } else {
    canScroll(true);
  }

  function handleClick(e: React.SyntheticEvent) {
    (e.target as HTMLElement)?.id === "background" && toggleModal('off');
  }

  return (
    <div
      id='background'
      className={`fixed inset-0 z-10 flex h-full w-full items-start justify-center overflow-auto bg-stone-800/75 pt-[15vh]`}
      style={{
        display: isModalShow ? "flex" : "none",
      }}
      onClick={handleClick}
    >
      <div className='w-2/3 lg:w-1/2'>{children}</div>
    </div>
  );
};