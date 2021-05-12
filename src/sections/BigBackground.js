import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import ExpandingLine from "../components/ExpandingLine";
import videoThumb from "../images/home_video_thumb.jpg";
import video from "../images/home_video.mp4";

export default function BigBackground(props) {
  const {
    sectionData: { caption, content },
  } = props;
  return (
    <article className="homepage-section homepage-section-BigBackground ">
      <div className=" homepage-section-BigBackground-layers ">
        <video
          playsInline
          autoPlay
          muted
          loop
          poster={videoThumb}
          className="section-BigBackground-video"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="section-BigBackground-image-overlay">
          <h2>{caption && caption}</h2>
          <ExpandingLine />
          {content && (
            <BlockContent
              blocks={content}
              projectId="1ta3690e"
              dataset="production"
              className="section-BigBackground-text-content"
            />
          )}
        </div>
      </div>
    </article>
  );
}

/*
        className="section-BigBackground-image"
        style={{
          backgroundImage: `url(${image.asset.url})`,
        }}
*/
