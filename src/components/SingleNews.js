import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

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
      body,
      "name": author->name,
      "authorImage": author->image,
    }`
      )
      .then((data) => {
        setSingleNews(data[0]);
      })
      .catch(console.error);
  }, [slug]);
  if (!singleNews) return <div>Loading...</div>;

  return (
    <>
      <main className="News-single">
        <div className="News-single-header-background"></div>

        <article>
          <h1>{singleNews.title}</h1>
          <h4>{new Date(singleNews.publishedAt).toLocaleDateString()}</h4>

          <BlockContent
            blocks={singleNews.body}
            projectId="1ta3690e"
            dataset="production"
          />
          {singleNews.mainImage && (
            <div className="News-page-image">
              <img
                src={singleNews.mainImage.asset.url}
                alt={singleNews.title}
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
