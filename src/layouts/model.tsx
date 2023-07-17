import { ModelControlContext } from "@/hooks/model control";
import { useScroll } from "@/hooks/scroll control";
import { useContext } from "react";

interface modelProps {
  show: boolean;
  setShow: (b: boolean) => void;
  children: JSX.Element;
}

export const Model = ({ show, setShow, children }: modelProps) => {
  const { canScroll } = useScroll();

  if (show) {
    canScroll(false);
  } else {
    canScroll(true);
  }

  function handleClick(e: React.SyntheticEvent) {
    (e.target as HTMLElement)?.id === "background" && setShow(false);
  }

  const model_ctx = {
    isShow: show,
    setShow: setShow,
  };

  return (
    <ModelControlContext.Provider value={model_ctx}>
      <div
        id='background'
        className={`fixed inset-0 z-10 flex h-full w-full items-start justify-center overflow-auto bg-stone-800/75 pt-[15vh]`}
        style={{
          display: show ? "flex" : "none",
        }}
        onClick={handleClick}
      >
        {children}
      </div>
    </ModelControlContext.Provider>
  );
};
