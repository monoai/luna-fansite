import { createContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";

enum Orientation {
  Portrait = 1,
  Landscape,
}

export const LayoutContext = createContext<{
  orientation: Orientation;
  width: number;
} | null>(null);

export function isPortrait(orientation?: Orientation | null): boolean {
  return orientation! === Orientation.Portrait;
}

export const LayoutProvider = (props: React.PropsWithChildren<{}>) => {
  function calculate() {
    return window.innerWidth < 720
      ? Orientation.Portrait
      : Orientation.Landscape;
  }

  const [orientation, setOrientation] = useState({
    orientation: calculate(),
    width: window.innerWidth,
  });

  useEffect(() => {
    let callback: any;
    if (window.navigator.userAgent.includes("Mobile")) {
      callback = () => {
        setOrientation({ orientation: calculate(), width: window.innerWidth });
      };
    } else {
      callback = debounce(() => {
        setOrientation({ orientation: calculate(), width: window.innerWidth });
      }, 15);
    }

    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, []);

  useEffect(() => {
    document.body.className = isPortrait(orientation.orientation)
      ? "portrait"
      : "landscape";
  }, [orientation]);

  return (
    <LayoutContext.Provider value={orientation} children={props.children} />
  );
};
