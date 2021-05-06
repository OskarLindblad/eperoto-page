import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import ExpandingLine from "../components/ExpandingLine";

export default function BigBackground(props) {
  const {
    sectionData: { caption, content, image },
  } = props;
  return (
    <article className="homepage-section homepage-section-BigBackground ">
      <div
        src={image.asset.url}
        className="section-BigBackground-image"
        style={{
          backgroundImage: `url(${image.asset.url})`,
        }}
      >
        <div className="section-BigBackground-image-overlay">
          <h2>{caption}</h2>
          <ExpandingLine />
          <BlockContent
            blocks={content}
            projectId="1ta3690e"
            dataset="production"
            className="section-BigBackground-text-content"
          />
        </div>
      </div>
    </article>
  );
}
