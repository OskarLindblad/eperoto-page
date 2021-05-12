import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
import scrollPosition from "../modules/scrollPosition";

export default function Position() {
  const [positionData, setPosition] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "positions"]{
      title,
      slug,
      body,
    }`
      )
      .then((data) => setPosition(data))
      .catch(console.error);
  }, []);

  let scrolledDown = false;
  if (scrollPosition() > 100) {
    scrolledDown = true;
  }

  return (
    <>
      <main className="Positions-page">
        <div
          className={`logo ${
            scrolledDown && "Positions-page-header-background"
          }`}
        ></div>
        <h4 className="Positions-page-caption">Open Positions</h4>

        {positionData &&
          positionData.map((positions, index) => (
            <article key={index}>
              <div className="Positions-page-single-container">
                <div className="Positions-page-single">
                  {positions.slug && (
                    <Link
                      to={"/positions/" + positions.slug.current}
                      key={positions.slug.current}
                    >
                      <h3>{positions.title && positions.title}</h3>
                    </Link>
                  )}

                  {positions.body && (
                    <BlockContent
                      blocks={positions.body[0]}
                      projectId="1ta3690e"
                      dataset="production"
                    />
                  )}
                  {positions.slug && (
                    <Link to={"/positions/" + positions.slug.current}>
                      <div className="Positions-page-single-readMore"></div>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
      </main>
      <Footer />
    </>
  );
}
