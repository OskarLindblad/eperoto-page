import React from "react";
import load from "../images/load.gif";

export default function Loading() {
  return (
    <div className="loading-gif">
      <img src={load} alt="loading" />
    </div>
  );
}
