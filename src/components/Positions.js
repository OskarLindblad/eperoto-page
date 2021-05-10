import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
export default function Position() {
  const [positionData, setPosition] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "positions"]{
      title,
      slug,
      body,
      mainImage{
        asset->{
          _id,
          url
        },
        body
      }
    }`
      )
      .then((data) => setPosition(data))
      .catch(console.error);
  }, []);

  console.log(positionData);
  return (
    <>
      <main className="Positions-page">
        <div className="Positions-page-header-background"></div>
        <h4 className="Positions-page-caption">Open Positions</h4>

        {positionData &&
          positionData.map((positions, index) => (
            <article key={index}>
              <div className="Positions-page-single-container">
                <div className="Positions-page-single">
                  <Link
                    to={"/positions/" + positions.slug.current}
                    key={positions.slug.current}
                  >
                    <h3>{positions.title}</h3>
                  </Link>

                  <BlockContent
                    blocks={positions.body[0]}
                    projectId="1ta3690e"
                    dataset="production"
                  />
                  <Link to={"/positions/" + positions.slug.current}>
                    <div className="Positions-page-single-readMore"></div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
      </main>
      <Footer />
    </>
  );
}
