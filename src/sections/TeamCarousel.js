import React from "react";

export default function TeamCarousel(props) {
  const {
    sectionData: {
      //caption,
      //content,
      //image,
      backgroundColor,
      //order,
    },
    index,
  } = props;
  return (
    <article
      className={`homepage-section homepage-section-TeamCarousel homepage-section-padding
      homepage-section-${index}`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      TeamCarousel{index}
    </article>
  );
}
