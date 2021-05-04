import React, { useEffect, useState, useRef } from "react";
import sanityClient from "../client.js";

import BigBackground from "../sections/BigBackground";
import Collaborators from "../sections/Collaborators";
import NewsSection from "../sections/NewsSection";
import OneBlock from "../sections/OneBlock";
import SepareBlocks from "../sections/SepareBlocks";
import TeamCarousel from "../sections/TeamCarousel";
import WhyNotYou from "../sections/WhyNotYou";

export default function Home() {
  const [homePageSections, setHomePageSections] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition);
  let refs = useRef([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "homepageSection"]{
          caption,
          content,
          image,
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
  } // else { dummy array for nicer load?}
  const createSection = (section) => {
    if (section.sectionType === "bigBackground") {
      return <BigBackground sectionData={section} />;
    } else if (section.sectionType === "oneBlock") {
      return <OneBlock sectionData={section} />;
    } else if (section.sectionType === "separeBlocks") {
      return <SepareBlocks sectionData={section} />;
    } else if (section.sectionType === "collaborators") {
      return <Collaborators sectionData={section} />;
    } else if (section.sectionType === "news") {
      return <NewsSection sectionData={section} />;
    } else if (section.sectionType === "whyNotYou") {
      return <WhyNotYou sectionData={section} />;
    } else if (section.sectionType === "teamCarousel") {
      return <TeamCarousel sectionData={section} />;
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    scrollTo();
  };

  const scrollTo = () => {
    window.scrollTo({ top: 900 });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*useEffect(() => {
   const screenHeight = window.innerHeight;
    const section = parseInt(scrollPosition / screenHeight);
    const scrollToNext = 100;
    const scrollToAbove = screenHeight - scrollToNext;

    if (
      scrollPosition % screenHeight > scrollToNext ||
      scrollPosition % screenHeight < scrollToAbove
    ) {
      if (scrollPosition % screenHeight > scrollToNext)
        window.scrollTo(0, (section + 1) * screenHeight);
      if (scrollPosition % screenHeight < scrollToAbove)
        window.scrollTo(0, (section - 1) * screenHeight);
    }

    console.log(scrollPosition % screenHeight);
  }, []);*/

  return (
    <main>
      <section>
        {sections &&
          sections.map((section, index) => (
            <div
              key={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
            >
              {createSection(section)}
            </div>
          ))}
      </section>
      <button
        onClick={() => refs.current[2].scrollIntoView({ behavior: "smooth" })}
      >
        Klick
      </button>
    </main>
  );
}

/*...(timeToScroll() && window.scrollTo({ top: 700, behavior: "smooth" }))*/
