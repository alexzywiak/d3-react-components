import { useLayoutEffect, useRef } from "react";

interface RenderLifecycleArgs {
  firstRender?: Function;
  updateRender?: Function;
  lastRender?: Function;
}

export const renderLifeCycle = ({
  firstRender,
  updateRender,
  lastRender
}: RenderLifecycleArgs) => {
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!isFirstRender.current) {
      updateRender && updateRender();
    }
  });

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      firstRender && firstRender();
    }

    return () => {
      lastRender && lastRender();
    };
  }, []);
};
