import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useState, useEffect } from "react";
import "./Resizable.css";

interface IResizableProps {
  direction: "vertical" | "horizontal";
}

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const currentWidth = window.innerWidth * 0.75;
        if (currentWidth < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 200);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableBoxProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableBoxProps = {
      width,
      height: Infinity,
      minConstraints: [24, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableBoxProps = {
      width: Infinity,
      height: window.innerHeight * 0.9,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      resizeHandles: ["s"]
    };
  }
  return (
    <ResizableBox
      {...resizableBoxProps}
      className={`react-resizable-${direction}`}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
