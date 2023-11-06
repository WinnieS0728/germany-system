import Skeleton from "react-loading-skeleton";

interface blockLoadingProps {
  height?: number;
}
interface circleLoadingProps {
  r?: number;
}

function BlockLoading({ height }: blockLoadingProps) {
  return (
    <Skeleton
      count={1}
      height={height || 16 * 3}
      className='rounded-md'
    />
  );
}

function CircleLoading({ r }: circleLoadingProps) {
  return (
    <Skeleton
      count={1}
      width={r || 16 * 5}
      height={r || 16 * 5}
      circle
    />
  );
}

export const Loading = {
  block: BlockLoading,
  circle: CircleLoading,
};
