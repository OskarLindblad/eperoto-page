import React, { useState } from "react";
import ExpandingLine from "../components/ExpandingLine";
import BlockContent from "@sanity/block-content-to-react";

const Carusel = ({ slideData, caption }) => {
  console.log(slideData);
  const [current, setCurrent] = useState(0);
  let length = slideData ? slideData.length : 0;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slideData) || slideData.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div className="slider-left-arrow" onClick={prevSlide}></div>
      <div className="slider-right-arrow" onClick={nextSlide}></div>
      {slideData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <>
                <div className="slider-presentation">
                  <h4 className="homepage-section-caption">{caption}</h4>
                  <h3 className="slider-title">
                    {slide.firstName} {slide.lastName}
                  </h3>
                  <ExpandingLine />
                  <BlockContent
                    blocks={slide.bio}
                    projectId="1ta3690e"
                    dataset="production"
                  />
                </div>
                <div className="slider-image">
                  <img
                    src={slide.image.asset.url}
                    alt={slide.firstName + " " + slide.lastName}
                  />
                  {/*TODO before after / current*/}
                  <a
                    className="slider-contact-btn"
                    href={`mailto:${slide.mail}`}
                  >
                    <div>Write to {slide.firstName}</div>
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Carusel;