import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { FullPage, Slide } from "react-full-page";

import Footer from "../components/Footer";

import BigBackground from "../sections/BigBackground";
import Collaborators from "../sections/Collaborators";
import NewsSection from "../sections/NewsSection";
import OneBlock from "../sections/OneBlock";
import SepareBlocks from "../sections/SepareBlocks";
import TeamCarousel from "../sections/TeamCarousel";
import WhyNotYou from "../sections/WhyNotYou";

export default function Home() {
  const [homePageSections, setHomePageSections] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "homepageSection"]{
          caption,
          content,
          image{
            asset->{
              _id,
              url
            }
          },
          sectionType,
          backgroundColor,
          order
    }`
      )
      .then((data) => {
        setHomePageSections(data);
      })
      .catch(console.error);
  }, []);

  let sections;
  if (homePageSections) {
    sections = homePageSections.sort((a, b) => (a.order > b.order ? 1 : -1));
  } // TODO else { dummy array for nicer load?}
  const createSection = (section, index) => {
    if (section.sectionType === "bigBackground") {
      return <BigBackground sectionData={section} index={index} />;
    } else if (section.sectionType === "oneBlock") {
      return <OneBlock sectionData={section} index={index} />;
    } else if (section.sectionType === "separeBlocks") {
      return <SepareBlocks sectionData={section} index={index} />;
    } else if (section.sectionType === "collaborators") {
      return <Collaborators sectionData={section} index={index} />;
    } else if (section.sectionType === "news") {
      return <NewsSection sectionData={section} index={index} />;
    } else if (section.sectionType === "whyNotYou") {
      return <WhyNotYou sectionData={section} index={index} />;
    } else if (section.sectionType === "teamCarousel") {
      return <TeamCarousel sectionData={section} index={index} />;
    }
  };
  //TODO: MOBILE if(width incase <Slide> and replace with div)
  //TODO: MOBILE ALso kill when weird height

  return (
    <main>
      <FullPage controls>
        {sections &&
          sections.map((section, index) => (
            <Slide key={index}>{createSection(section, index)}</Slide>
          ))}
        <Slide>
          <Footer />
        </Slide>
      </FullPage>
    </main>
  );
}
