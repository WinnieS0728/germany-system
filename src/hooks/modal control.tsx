import { useAppDispatch, useAppSelector } from "@data/store";
import {
  modalList,
  toggleModal,
} from "@/data/reducers/modal control/modalControl";
import { useCallback } from "react";

export const useModalControl = (
  name: keyof modalList
): [(control: "on" | "off") => void, boolean] => {
  const modalState = useAppSelector((state) => state.modalControl);

  const isShow = modalState.body[name as keyof modalList];

  const dispatch = useAppDispatch();

  const modalControl = useCallback(
    (control: "on" | "off") => {
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
    },
    [dispatch, name]
  );

  return [modalControl, isShow];
};
