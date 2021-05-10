import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

export default function WhyNotYou(props) {
  const {
    sectionData: { caption, backgroundColor },
  } = props;
  const [positions, setPositions] = useState(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "positions"]{
      title,
      slug,
      body,
    }`
      )
      .then((data) => setPositions(data))
      .catch(console.error);
  }, []);

  console.log(positions);

  //Removes everything but two newsstories
  positions && positions.splice(2);

  return (
    <article
      className={`homepage-section homepage-section-WhyNotYou homepage-section-padding`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <h4 className="homepage-section-caption">{caption}</h4>
      {positions &&
        positions.map((position, index) => (
          <article key={index}>
            <Link
              to={"/positions/" + position.slug.current}
              key={position.slug.current}
            >
              <div className="homepage-section-WhyNotYou-single">
                <h3>{position.title}</h3>
                <BlockContent
                  blocks={position.body}
                  projectId="1ta3690e"
                  dataset="production"
                />
              </div>
            </Link>
          </article>
        ))}
    </article>
  );
}
