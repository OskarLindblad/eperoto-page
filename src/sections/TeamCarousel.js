import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import Carusel from "../components/Carusel";

export default function TeamCarousel(props) {
  const {
    sectionData: { caption, backgroundColor },
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

  let teamMember;
  if (team) {
    teamMember = team.sort((a, b) => (a.order > b.order ? 1 : -1));
  }
  return (
    <article
      className="homepage-section homepage-section-TeamCarousel homepage-section-padding"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <Carusel slideData={teamMember} caption={caption} />
    </article>
  );
}
