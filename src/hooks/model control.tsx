import { useAppDispatch, useAppSelector } from "./redux";
import { toggleModel } from "@/data/reducers/model control/modelControl";

export const useModelControl = (name: string) => {
  const modelState = useAppSelector((state) => state.modelControl);

  const isShow = modelState[name].isOpen;

  const dispatch = useAppDispatch();
  function open() {
    dispatch(
      toggleModel({
        name: name,
        status: true,
      })
    );
  }

  function close() {
    dispatch(
      toggleModel({
        name: name,
        status: false,
      })
    );
  }

  return {
    isModelShow: isShow,
    openModel: open,
    closeModel: close,
  };
};
