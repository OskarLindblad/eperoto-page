import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import useWindowDimensions from "../modules/useWindowDimensions";

import videoThumb from "../images/home_video_thumb.jpg";
import video from "../images/home_video.mp4";

import Header from "../components/Header";
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
  const [currentBackGround, setCurrentBackGround] = useState("rgba(0,0,0,0)");
  const [darkColors, setDarkColors] = useState(false);

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
    const currentSection = parseInt(
      // - 16 is to trigger earlier
      (scrollPosition + 1) / (window.innerHeight - 70)
    );
    // If width is lower than 769px change to one color(except on bigBackground)
    if (dimensions.width < 769 || dimensions.height < 800) {
      setDarkColors(false);

      if (scrollPosition < window.innerHeight) {
        setCurrentBackGround("rgba(0,0,0,0)");
      } else {
        setCurrentBackGround("#2e394b");
      }
    } else {
      if (homePageSections) {
        if (scrollPosition < window.innerHeight) {
          // If statement did'nt catch every top color so added this
          setCurrentBackGround("rgba(0,0,0,0)");
        } else {
          if (currentSection >= homePageSections.length) {
            // Footer
            setCurrentBackGround("#242f41");
          } else {
            if (homePageSections[currentSection].backgroundColor) {
              setCurrentBackGround(
                homePageSections[currentSection].backgroundColor
              );
              setDarkColors(false);
              if (
                homePageSections[currentSection].backgroundColor === "#ffd778"
              ) {
                setDarkColors(true);
              }
            }
          }
        }
      }
    }
  };

  return (
    <>
      <Header
        darkColors={darkColors}
        hideInHome={false}
        style={{ zIndex: "2000" }}
      />
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
              <article className="homepage-section homepage-section-BigBackground ">
                <div className=" homepage-section-BigBackground-layers ">
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    poster={videoThumb}
                    className="section-BigBackground-video"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  <div className="section-BigBackground-image-overlay">
                    <h2>Value and evaluate your legal disputes​​</h2>
                  </div>
                </div>
              </article>
            )}
            <div className="no-slide">
              <Footer />
            </div>
          </div>
        ) : (
          <div>
            {sections ? (
              sections.map((section, index) => (
                <div style={{ height: "100vh" }} key={index}>
                  {createSection(section, index)}
                </div>
              ))
            ) : (
              <article className="homepage-section homepage-section-BigBackground ">
                <div className=" homepage-section-BigBackground-layers ">
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    poster={videoThumb}
                    className="section-BigBackground-video"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  <div className="section-BigBackground-image-overlay"></div>
                </div>
              </article>
            )}
            <Footer />
          </div>
        )}
      </main>
    </>
  );
}
