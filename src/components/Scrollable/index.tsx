import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

import "./Scrollable.scss";

export type ScrollOption = "top" | "bottom";
type ScrollableProps = {
  style: CSSProperties;
  scroll: ScrollOption;
  children: ReactNode;
};

export const Scrollable = ({ scroll, style, children }: ScrollableProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    if (divRef.current && scroll)
      divRef.current.scrollTop =
        scroll === "top" ? 0 : divRef.current.scrollHeight;
  }, [scroll]);

  return (
    <div ref={divRef} className="scrollable" style={style}>
      {children}
    </div>
  );
};

type ImperativeScrollableProps = {
  style: CSSProperties;
  children: ReactNode;
};

export type ImperativeScrollableRef = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

export const ImperativeScrollable = forwardRef<
  ImperativeScrollableRef,
  ImperativeScrollableProps
>(({ style, children }: ImperativeScrollableProps, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (divRef.current) divRef.current.scrollTop = 0;
  };
  const scrollToBottom = () => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useImperativeHandle(ref, () => ({ scrollToTop, scrollToBottom }));

  return (
    <div ref={divRef} className="scrollable" style={style}>
      {children}
    </div>
  );
});
