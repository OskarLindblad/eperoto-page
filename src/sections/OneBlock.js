import React from "react";
import ExpandingLineYellow from "../components/ExpandingLineYellow";
import BlockContent from "@sanity/block-content-to-react";

export default function OneBlock(props) {
  const {
    sectionData: { caption, content, backgroundColor },
    index,
  } = props;
  return (
    <article
      className={`homepage-section homepage-section-OneBlock homepage-section-padding
      homepage-section-${index}`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <div className="homepage-section-container">
        <h4 className="homepage-section-caption">{caption && caption}</h4>
        <ExpandingLineYellow />
        {content && (
          <BlockContent
            blocks={content}
            projectId="1ta3690e"
            dataset="production"
            className="section-OneBlock-text-content"
          />
        )}
      </div>
    </article>
  );
}
