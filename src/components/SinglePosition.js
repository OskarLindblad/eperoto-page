import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import scrollPosition from "../modules/scrollPosition";

export default function SinglePosition() {
  const [singlePosition, setSinglePosition] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      body,
    }`
      )
      .then((data) => {
        setSinglePosition(data[0]);
      })
      .catch(console.error);
  }, [slug]);
  let scrolledDown = false;
  if (scrollPosition() > 50) {
    scrolledDown = true;
  }
  if (!singlePosition) return <div>Loading...</div>;

  return (
    <>
      <main className="Positions-single">
        <div
          className={` ${
            scrolledDown
              ? "Positions-single-header-background"
              : "hidden-header-background"
          } header-background-transition
          `}
        ></div>

        <article>
          <h1>{singlePosition.title && singlePosition.title}</h1>

          {singlePosition.body && (
            <BlockContent
              blocks={singlePosition.body}
              projectId="1ta3690e"
              dataset="production"
            />
          )}
          <Link className="Positions-page-btn" to={"/contact/"}>
            <div>Contact Us</div>
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
