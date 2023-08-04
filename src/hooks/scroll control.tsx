export const useScroll = () => {
  const html = document.documentElement;
  const disable = () => {
    html.style.overflow = "hidden";
  };
  const allow = () => {
    html.style.overflow = "auto";
  };

  const canScroll = (b: boolean) => {
    if (!b) {
      disable();
    } else {
      allow();
    }
  };

  return { canScroll };
};
