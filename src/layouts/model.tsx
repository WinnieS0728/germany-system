import { useModelControl } from "@/hooks/model control";
import { useScroll } from "@/hooks/scroll control";

interface modelProps {
  children: JSX.Element;
}

export const Model = ({ children }: modelProps) => {
  const { canScroll } = useScroll();
  const { isModelShow, closeModel } = useModelControl();

  if (isModelShow) {
    canScroll(false);
  } else {
    canScroll(true);
  }

  function handleClick(e: React.SyntheticEvent) {
    (e.target as HTMLElement)?.id === "background" && closeModel();
  }

  return (
    <div
      id='background'
      className={`fixed inset-0 z-10 flex h-full w-full items-start justify-center overflow-auto bg-stone-800/75 pt-[15vh]`}
      style={{
        display: isModelShow ? "flex" : "none",
      }}
      onClick={handleClick}
    >
      <div className='w-2/3 lg:w-1/2'>{children}</div>
    </div>
  );
};
