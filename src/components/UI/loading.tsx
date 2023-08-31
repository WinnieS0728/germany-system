import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";

export const Loading = () => {
  const color = useTheme()?.color;
  return (
    <Skeleton
      count={1}
      height={"3rem"}
      baseColor={color.tableBgc}
      highlightColor={color.white}
    />
  );
};
