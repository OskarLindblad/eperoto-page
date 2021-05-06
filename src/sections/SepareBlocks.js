import React from "react";
import BlockContent from "@sanity/block-content-to-react";
//import ExpandingLine from "../components/ExpandingLine";

export default function SepareBlocks(props) {
  const {
    sectionData: {
      caption,
      content,
      //image,
      backgroundColor,
      //order,
    },
  } = props;

  let newContent = [];
  if (content) {
    let strongIndex = -1;
    for (let i = 0; i < content.length; i++) {
      if (content[i].children[0].marks[0] === "strong") {
        newContent.push([content[i]]);
        strongIndex++;
      } else {
        newContent[strongIndex].push(content[i]);
      }
    }
  }
  return (
    <article
      className="homepage-section homepage-section-SepareBlocks homepage-section-padding"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <h4 className="homepage-section-caption">{caption}</h4>
      <div className="section-SepareBlocks-text-content">
        {newContent.map((contentSection, index) => (
          <BlockContent
            key={index}
            blocks={contentSection}
            projectId="1ta3690e"
            dataset="production"
            className={`section-SepareBlocks-text-block  section-SepareBlocks-blocks-${newContent.length}`}
          />
        ))}
      </div>
    </article>
  );
}
