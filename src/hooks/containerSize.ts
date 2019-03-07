import { useState, useEffect } from "react";

const resizeThrottler = (
  actualResizeHandler: Function,
  throttle: number
) => () => {
  let resizeTimeout = null;
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      actualResizeHandler();
    }, throttle);
  }
};

function getSize(ref: React.RefObject<HTMLElement>) {
  const { current } = ref;
  if (current) {
    return current.getBoundingClientRect();
  }
  return { height: 0, width: 0 };
}

export function useContainerSize(
  ref: React.RefObject<HTMLElement>,
  throttle: number = 250
) {
  const [containerSize, setContainerSize] = useState(getSize(ref));

  function handleResize() {
    setContainerSize(getSize(ref));
  }

  useEffect(() => {
    window.addEventListener("resize", resizeThrottler(handleResize, throttle));
    return () => {
      window.removeEventListener(
        "resize",
        resizeThrottler(handleResize, throttle)
      );
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [ref]);

  return containerSize;
}
