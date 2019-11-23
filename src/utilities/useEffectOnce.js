import { useEffect, useRef } from "react";

export default function useEffectOnce(callbackFn) {
  const thisEffectHasBeenUsed = useRef(false);

  useEffect(() => {
    if (!thisEffectHasBeenUsed.current) {
      callbackFn();
      thisEffectHasBeenUsed.current = true;
    }
  });
}
