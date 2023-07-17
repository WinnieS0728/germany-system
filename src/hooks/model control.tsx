import { createContext, useContext } from "react";

const initContext = {
  isShow: true,
  setShow: (b: boolean) => {
    console.log(b);
  },
};
export const ModelControlContext =
  createContext<typeof initContext>(initContext);

export const useModelControlContext = () => useContext(ModelControlContext);
