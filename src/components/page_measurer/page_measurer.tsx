// breakpoints taken from https://getbootstrap.com/docs/5.0/layout/breakpoints/

import { createContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
export enum Breakpoint {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1400,
}

function getBreakPoint(width: number): Breakpoint {
  if (width >= Breakpoint.XXL) {
    return Breakpoint.XXL;
  }
  if (width >= Breakpoint.XL) {
    return Breakpoint.XL;
  }
  if (width >= Breakpoint.LG) {
    return Breakpoint.LG;
  }
  if (width >= Breakpoint.MD) {
    return Breakpoint.MD;
  }
  if (width >= Breakpoint.SM) {
    return Breakpoint.SM;
  }
  if (width >= Breakpoint.XS) {
    return Breakpoint.XS;
  }

  throw new Error("We somehow have a negative width");
}

type PageContext = {
  width: number;
  height: number;
  breakpoint: Breakpoint;
};

const Context = createContext<PageContext>({
  width: window.innerWidth,
  height: window.innerHeight,
  breakpoint: getBreakPoint(window.innerWidth),
});

export const PageConsumer = Context.Consumer;

export const PageProvider = (props: React.PropsWithChildren<{}>) => {
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakPoint(window.innerWidth),
  });

  useEffect(() => {
    const callback = debounce(
      () =>
        setPageSize({
          width: window.innerWidth,
          height: window.innerHeight,
          breakpoint: getBreakPoint(window.innerWidth),
        }),
      1000 / 60,
    );
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  });

  return <Context.Provider value={pageSize} children={props.children} />;
};
