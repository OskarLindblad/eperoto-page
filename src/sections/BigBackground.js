import React, { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import ExpandingLine from "../components/ExpandingLine";
import videoThumb from "../images/home_video_thumb.jpg";
import video from "../images/home_video.mp4";

export default function BigBackground(props) {
  const [showContent, setShowContent] = useState(false);
  const {
    sectionData: { caption, content },
  } = props;
  useEffect(() => {
    setTimeout(function () {
      setShowContent(true);
    }, 200);
  }, []);
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
          <h2
            className="section-BigBackground-showContent"
            style={{ opacity: showContent ? "1" : "0" }}
          >
            {caption && caption}
          </h2>
          <ExpandingLine />
          {content && (
            <div
              className="section-BigBackground-showContent"
              style={{ opacity: showContent ? "1" : "0" }}
            >
              <BlockContent
                blocks={content}
                projectId="1ta3690e"
                dataset="production"
                className="section-BigBackground-text-content"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
