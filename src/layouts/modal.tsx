import { modalList } from "@/data/reducers/modal control/modalControl";
import { useModalControl } from "@/hooks/modal control";

interface modalProps {
  name: keyof modalList;
  children: JSX.Element;
}

export const Modal = ({ name, children }: modalProps) => {
  const [toggleModal, isModalShow] = useModalControl(name);

  function handleClick(e: React.SyntheticEvent) {
    (e.target as HTMLElement)?.id === `${name}-background` &&
      toggleModal("off");
  }

  return (
    <div
      id={`${name}-background`}
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
