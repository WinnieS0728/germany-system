export const useScroll = () => {
  const html = document.documentElement;
  const allow = () => {
    html.style.overflow = "hidden";
  };
  const disable = () => {
    html.style.overflow = "auto";
  };

  const canScroll = (b: boolean) => {
    if (!b) {
      allow();
    } else {
      disable();
    }
  };

  return { canScroll };
};
