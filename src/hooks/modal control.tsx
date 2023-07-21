import { useAppDispatch, useAppSelector } from "./redux";
import { toggleModal } from "@/data/reducers/modal control/modalControl";

export const useModalControl = (name: string) => {
  const modalState = useAppSelector((state) => state.modalControl);

  const isShow = modalState[name].isOpen;

  const dispatch = useAppDispatch();
  function open() {
    dispatch(
      toggleModal({
        name: name,
        status: true,
      })
    );
  }

  function close() {
    dispatch(
      toggleModal({
        name: name,
        status: false,
      })
    );
  }

  return {
    isModalShow: isShow,
    openModal: open,
    closeModal: close,
  };
};
