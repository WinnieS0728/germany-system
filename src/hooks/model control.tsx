import { useAppDispatch, useAppSelector } from "./redux";
import { toggleModel } from "@/data/reducers/model control/modelControl";

export const useModelControl = () => {
  const modelState = useAppSelector((state) => state.modelControl);

  const isShow = modelState.isOpen;

  const dispatch = useAppDispatch();
  function open() {
    dispatch(toggleModel(true));
  }

  function close() {
    dispatch(toggleModel(false));
  }

  return {
    isModelShow: isShow,
    openModel: open,
    closeModel: close,
  };
};
