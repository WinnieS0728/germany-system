import { useAppDispatch, useAppSelector } from "./redux";
import { toggleModal } from "@/data/reducers/modal control/modalControl";

export const useModalControl = (
  name: string
): [(control: "on" | "off") => void, boolean] => {
  const modalState = useAppSelector((state) => state.modalControl);

  const isShow = modalState[name].isOpen;

  const dispatch = useAppDispatch();

  function modalControl(control: "on" | "off") {
    let b;
    if (control === "on") {
      b = true;
    } else if (control === "off") {
      b = false;
    }
    dispatch(
      toggleModal({
        name: name,
        status: b,
      })
    );
  }

  return [modalControl, isShow];
};
