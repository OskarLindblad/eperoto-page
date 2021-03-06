import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
import scrollPosition from "../modules/scrollPosition";

export default function News() {
  const [newsData, setNews] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "news"]{
      title,
      slug,
      body,
      publishedAt,
    }`
      )
      .then((data) => setNews(data))
      .catch(console.error);
  }, []);

  let scrolledDown = false;
  if (scrollPosition() > 50) {
    scrolledDown = true;
  }

  return (
    <>
      <main className="News-page">
        <div
          className={` ${
            scrolledDown
              ? "News-page-header-background"
              : "hidden-header-background"
          } header-background-transition
          `}
        ></div>

        <h4 className="News-page-caption">News</h4>

        {newsData &&
          newsData.map((news, index) => (
            <article key={index}>
              <div className="News-page-single-container">
                <div className="News-page-single">
                  <Link to={"/news/" + news.slug.current}>
                    <h3>{news.title && news.title}</h3>
                    <h4>
                      {news.publishedAt &&
                        new Date(news.publishedAt).toLocaleDateString()}
                    </h4>
                  </Link>
                  {news.body && (
                    <BlockContent
                      blocks={news.body[0]}
                      projectId="1ta3690e"
                      dataset="production"
                    />
                  )}
                  {news.slug && (
                    <Link to={"/news/" + news.slug.current}>
                      <div className="News-page-single-readMore"></div>
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
