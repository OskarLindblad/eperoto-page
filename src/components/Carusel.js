import React, { useEffect, useState } from "react";
import ExpandingLine from "../components/ExpandingLine";
import BlockContent from "@sanity/block-content-to-react";

const Carusel = ({ slideData, caption }) => {
  let length = slideData ? slideData.length : 0;

  const [current, setCurrent] = useState(0);
  const [before, setBefore] = useState(length);
  const [after, setAfter] = useState(1);

  useEffect(() => {
    setTimeout(function () {
      if (length !== 0) {
        setBefore(length - 1);
      }
    }, 500);
  }, [length]);

  const nextSlide = () => {
    //let now = current
    setCurrent(current === length - 1 ? 0 : current + 1);
    setBefore(before === length - 1 ? 0 : before + 1);
    setAfter(after === length - 1 ? 0 : after + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setBefore(before === 0 ? length - 1 : before - 1);
    setAfter(after === 0 ? length - 1 : after - 1);
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
                  <a
                    className="slider-contact-btn slider-contact-btn-smallscreen"
                    href={`mailto:${slide.mail}`}
                  >
                    <div>Write to {slide.firstName}</div>
                  </a>
                </div>
                <div className="slider-image">
                  <img
                    src={slide.image.asset.url}
                    alt={slide.firstName + " " + slide.lastName}
                    className="slider-image-current-noShow"
                  />
                  <div className="slider-image-wrapper">
                    <img
                      src={slide.image.asset.url}
                      alt={slide.firstName + " " + slide.lastName}
                      className="slider-image-current"
                    />
                    {slideData[before] && (
                      <img
                        src={slideData[before].image.asset.url}
                        alt={
                          slideData[before].firstName +
                          " " +
                          slideData[before].lastName
                        }
                        className="slider-image-before"
                        onClick={prevSlide}
                      />
                    )}
                    {slideData[after] && (
                      <img
                        src={slideData[after].image.asset.url}
                        alt={
                          slideData[after].firstName +
                          " " +
                          slideData[after].lastName
                        }
                        className="slider-image-after"
                        onClick={nextSlide}
                      />
                    )}
                  </div>

                  <a
                    className="slider-contact-btn slider-contact-btn-largescreen"
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
