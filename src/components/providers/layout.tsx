import { createContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";

type Size = { width: number; height: number };

export enum LayoutType {
  Portrait,
  UnusableLandscape,
  Landscape,
}

function isMobile(): boolean {
  return window.navigator.userAgent.includes("Mobile");
}

export const LayoutContext = createContext<Size | null>(null);

export function isPortrait(size: Size | null): boolean {
  return getLayoutType(size) === LayoutType.Portrait;
}

export function getLayoutType(size: Size | null): LayoutType {
  if (isMobile() && window.innerHeight < 500) {
    return LayoutType.UnusableLandscape;
  } else if (window.innerWidth > 720) {
    return LayoutType.Landscape;
  } else {
    return LayoutType.Portrait;
  }
}

export const LayoutProvider = (props: React.PropsWithChildren<{}>) => {
  function getSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  const [size, setSize] = useState<Size>(getSize());

  useEffect(() => {
    let callback: any;
    if (isMobile()) {
      callback = () => {
        setSize(getSize());
      };
    } else {
      callback = debounce(() => {
        setSize(getSize());
      }, 15);
    }

    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, []);

  useEffect(() => {
    document.body.className = isPortrait(size) ? "portrait" : "landscape";
  }, [size]);

  return <LayoutContext.Provider value={size} children={props.children} />;
};
