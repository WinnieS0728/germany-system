import { cn } from "@/utils/cn";

interface blockErrorProps {
  className?: string;
  message?: string;
}
interface circleErrorProps {
  className?: string;
}

function BlockError({ className, message = '壞東西' }: blockErrorProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-red-500 p-4 flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      <h3 className='text-myWhite text-3xl font-bold tracking-wider'>ERROR</h3>
      {message && <p className="text-myWhite">{message}</p>}
    </div>
  );
}

function CircleError({ className }: circleErrorProps) {
  return <div className={cn("w-20 h-20 rounded-full", className)}>!</div>;
}

export const Error = {
  block: BlockError,
  circle: CircleError,
};
