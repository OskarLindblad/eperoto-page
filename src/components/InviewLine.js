import React from "react";
import { useInView } from "react-intersection-observer";

export default function InviewLine({ color }) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div
      ref={ref}
      className={`inview-line ${
        inView ? "inview-line-visable" : "inview-line-hide"
      }`}
      style={{ backgroundColor: color ? color : "#ff695a" }}
    ></div>
  );
}
