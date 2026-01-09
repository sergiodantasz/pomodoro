import { useEffect, useRef } from "react";

export function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null
) {
  const savedCallback = useRef<C | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
