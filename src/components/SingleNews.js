import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import scrollPosition from "../modules/scrollPosition";

import Loading from "../components/Loading";

export default function SingleNews() {
  const [singleNews, setSingleNews] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      publishedAt,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body
    }`
      )
      .then((data) => {
        setSingleNews(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  let scrolledDown = false;
  if (scrollPosition() > 100) {
    scrolledDown = true;
  }
  if (!singleNews) return <Loading />;

  return (
    <>
      <main className="News-single">
        <div
          className={` ${scrolledDown && "News-single-header-background"}`}
        ></div>

        <article>
          <h1>{singleNews.title && singleNews.title}</h1>
          <h4>
            {singleNews.publishedAt &&
              new Date(singleNews.publishedAt).toLocaleDateString()}
          </h4>

          {singleNews.body && (
            <BlockContent
              blocks={singleNews.body}
              projectId="1ta3690e"
              dataset="production"
            />
          )}
          {singleNews.mainImage && (
            <div className="News-page-image">
              <img
                src={singleNews.mainImage.asset.url}
                alt={singleNews.title ? singleNews.title : "news picture"}
              />
            </div>
          )}
          <Link className="News-page-btn" to={"/news/"}>
            <div>More News</div>
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
