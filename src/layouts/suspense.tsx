import { Suspense } from "react";
interface props {
  children: JSX.Element;
  fallback?: JSX.Element;
}
export function MySuspense({ children, fallback }: props) {
  return (
    <>
      <Suspense fallback={fallback || <h1>欸我還在跑...</h1>}>
        {children}
      </Suspense>
    </>
  );
}
