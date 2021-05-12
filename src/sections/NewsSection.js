import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

export default function NewsSection(props) {
  const {
    sectionData: { backgroundColor },
  } = props;
  const [newsData, setNews] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "news"]{
      title,
      slug,
      body,
      mainImage{
        asset->{
          _id,
          url
        },
      }
    }`
      )
      .then((data) => setNews(data))
      .catch(console.error);
  }, []);

  //Removes everything but two newsstories
  newsData && newsData.splice(2);
  return (
    <article
      className={`homepage-section homepage-section-News  homepage-section-padding
      ${backgroundColor === "#ffd778" && "homepage-section-blackText"}`}
      style={{
        // Checks if yellow, probably needed on every Section
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <div className="homepage-section-container">
        {newsData &&
          newsData.map((news, index) => (
            <article key={index}>
              {news.slug && (
                <Link to={"/news/" + news.slug.current} key={news.slug.current}>
                  <div className="homepage-section-News-single">
                    <h3>{news.title && news.title}</h3>
                    {news.body && (
                      <BlockContent
                        blocks={news.body}
                        projectId="1ta3690e"
                        dataset="production"
                      />
                    )}
                  </div>
                </Link>
              )}
            </article>
          ))}
      </div>
    </article>
  );
}
