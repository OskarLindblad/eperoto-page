import React from "react";

export default function SepareBlocks(props) {
  const {
    sectionData: {
      //caption,
      //content,
      //image,
      backgroundColor,
      //order,
    },
  } = props;
  return (
    <article
      className="homepage-section"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      SepareBlocks
    </article>
  );
}
