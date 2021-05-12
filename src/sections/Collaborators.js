import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import ExpandingLine from "../components/ExpandingLine";
import BlockContent from "@sanity/block-content-to-react";

export default function Collaborators(props) {
  const {
    sectionData: { caption, content, backgroundColor },
  } = props;
  const [collaborators, setCollaborators] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "collaborator"]{
          name,
          link,
          image{
            asset->{
              _id,
              url
            }
          },
          order
    }`
      )
      .then((data) => {
        setCollaborators(data);
      })
      .catch(console.error);
  }, []);
  return (
    <article
      className="homepage-section homepage-section-Collaborators 
      homepage-section-padding"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#2e394b",
      }}
    >
      <div className="homepage-section-container">
        <h4 className="homepage-section-caption">{caption && caption}</h4>
        <ExpandingLine />
        {content && (
          <BlockContent
            blocks={content}
            projectId="1ta3690e"
            dataset="production"
            className="section-Collaborators-text-content"
          />
        )}
        <br />
        <div className="section-Collaborators-container">
          {collaborators &&
            collaborators.map((collaborator, index) => (
              <React.Fragment key={index}>
                {collaborator.image && (
                  <a
                    className="section-Collaborators-collaborator"
                    href={collaborator.link && collaborator.link}
                  >
                    <img
                      src={collaborator.image.asset.url}
                      alt={collaborator.name ? collaborator.name : collaborator}
                    />
                  </a>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </article>
  );
}
