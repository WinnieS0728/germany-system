import { useCallback } from "react";

export const useScroll = () => {
  const html = document.documentElement;
  const disable = useCallback(() => {
    html.style.overflow = "hidden";
  }, [html.style]);
  const allow = useCallback(() => {
    html.style.overflow = "auto";
  }, [html.style]);

  const canScroll = useCallback(
    (b: boolean) => {
      if (!b) {
        disable();
      } else {
        allow();
      }
    },
    [allow, disable]
  );

  return { canScroll };
};
