import { createContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";

type Size = { width: number; height: number };

export const LayoutContext = createContext<Size | null>(null);

export function isPortrait(size: Size | null): boolean {
  return size!.width < 720;
}

export const LayoutProvider = (props: React.PropsWithChildren<{}>) => {
  function getSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  const [size, setSize] = useState<Size>(getSize());

  useEffect(() => {
    let callback: any;
    if (window.navigator.userAgent.includes("Mobile")) {
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
