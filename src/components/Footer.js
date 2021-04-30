import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../client.js";

export default function Footer() {
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "footer"]{
            mail,
            phone,
            body,
            socialMediaLinks
        }`
      )
      .then((data) => {
        setFooter(data[0]);
      })
      .catch(console.error);
  }, []);

  if (!footer) return <div>Loading...</div>;

  return (
    <footer className="footer">
      <div className="footer-main">
        <a href={`mailto:${footer.mail}`} className="mail">
          {footer.mail}
        </a>
        <br />
        <a href={`tel:${footer.phone}`} className="tel">
          {footer.phone}
        </a>
        <br />
        <br />

        <BlockContent
          blocks={footer.body}
          projectId="1ta3690e"
          dataset="production"
        />
      </div>
      <div className="footer-socialMedia">
        {footer.socialMediaLinks &&
          footer.socialMediaLinks.map((link, index) => (
            <div className="socialMedia-icon" key={index}>
              <SocialIcon
                url={`${link}`}
                target="_blank"
                fgColor="#fff"
                bgColor="#242f41"
                style={{ height: 46, width: 46 }}
              />
            </div>
          ))}
      </div>
    </footer>
  );
}
