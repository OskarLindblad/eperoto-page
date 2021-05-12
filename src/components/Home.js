import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { FullPage, Slide } from "react-full-page";
import useWindowDimensions from "../modules/useWindowDimensions";

import Footer from "../components/Footer";
import Loading from "../components/Loading";

import BigBackground from "../sections/BigBackground";
import Collaborators from "../sections/Collaborators";
import NewsSection from "../sections/NewsSection";
import OneBlock from "../sections/OneBlock";
import SepareBlocks from "../sections/SepareBlocks";
import TeamCarousel from "../sections/TeamCarousel";
import WhyNotYou from "../sections/WhyNotYou";

export default function Home() {
  const [homePageSections, setHomePageSections] = useState(null);
  const [currentBackGround, setCurrentBackGround] = useState("rgba(0,0,0,0)");

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
  }
  const createSection = (section, index) => {
    if (section.sectionType) {
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
    }
  };
  const dimensions = useWindowDimensions();

  let turnOffSlide = false;
  if (dimensions.width < 769) {
    turnOffSlide = true;
  }
  if (dimensions.height < 800) {
    turnOffSlide = true;
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    checkBackGround();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const checkBackGround = () => {
    const currentSection = parseInt((scrollPosition + 1) / window.innerHeight);
    // If width is lower than 769px change to one color(except on bigBackground)
    if (dimensions.width < 769) {
      if (scrollPosition < window.innerHeight) {
        setCurrentBackGround("rgba(0,0,0,0)");
      } else {
        setCurrentBackGround("#2e394b");
      }
    } else {
      if (homePageSections) {
        if (currentSection >= homePageSections.length) {
          setCurrentBackGround("#242f41");
        } else {
          if (homePageSections[currentSection].backgroundColor) {
            if (
              homePageSections[currentSection].backgroundColor === "#ffd778"
            ) {
              setCurrentBackGround("#2e394b");
            } else {
              setCurrentBackGround(
                homePageSections[currentSection].backgroundColor
              );
            }
          }
        }
      }
    }
  };

  return (
    <main>
      <div
        className="header-background"
        style={{ background: currentBackGround }}
      ></div>
      {turnOffSlide ? (
        <div className="no-slide">
          {sections ? (
            sections.map((section, index) => (
              <div key={index}>{createSection(section, index)}</div>
            ))
          ) : (
            <Loading />
          )}
          <div className="no-slide">
            <Footer />
          </div>
        </div>
      ) : (
        <FullPage controls>
          {sections ? (
            sections.map((section, index) => (
              <Slide key={index}>{createSection(section, index)}</Slide>
            ))
          ) : (
            <Loading />
          )}
          <Slide>
            <Footer />
          </Slide>
        </FullPage>
      )}
    </main>
  );
}
