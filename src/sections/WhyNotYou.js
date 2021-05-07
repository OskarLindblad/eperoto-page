import React from "react";

export default function WhyNotYou(props) {
  const {
    sectionData: {
      //caption,
      //content,
      //image,
      backgroundColor,
    },
    index,
  } = props;
  return (
    <article
      className={`homepage-section homepage-section-WhyNotYou homepage-section-padding
      homepage-section-${index}`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      WhyNotYou{index}
    </article>
  );
}
