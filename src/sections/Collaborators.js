import React from "react";

export default function Collaborators(props) {
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
      className="homepage-section homepage-section-Collaborators 
      homepage-section-padding"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      Collaborators
    </article>
  );
}
