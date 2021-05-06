import React, { useEffect, useState } from "react";
import ExpandingLine from "../components/ExpandingLine";
import sanityClient from "../client.js";

export default function TeamCarousel(props) {
  const {
    sectionData: {
      caption,
      //content,
      //image,
      backgroundColor,
    },
  } = props;

  const [team, setTeam] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "teamMember"]{
          firstName,
          lastName,
          email,
          image{
            asset->{
              _id,
              url
            }
          },
          order,
          bio
    }`
      )
      .then((data) => {
        setTeam(data);
      })
      .catch(console.error);
  }, []);

  return (
    <article
      className="homepage-section homepage-section-TeamCarousel homepage-section-padding"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <h4 className="homepage-section-caption">{caption}</h4>
      <ExpandingLine />
    </article>
  );
}
