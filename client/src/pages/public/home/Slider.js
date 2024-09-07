import React, { useState, useEffect, useRef } from "react";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const slideTrackRef = useRef(null);
    const slides = [
        "slider-logo1.png",
        "slider-logo2.png",
        "slider-logo3.png",
        "slider-logo4.png",
        "slider-logo5.png",
        "slider-logo6.png",
        "slider-logo7.png"
    ]; // Ensure these paths are correct

    useEffect(() => {
        const autoSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        };

        const intervalId = setInterval(autoSlide, 2000);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    useEffect(() => {
        const slideTrack = slideTrackRef.current;
        if (!slideTrack) return;

        const slideWidth = slideTrack.children[0]?.offsetWidth || 0;

        slideTrack.style.transition = isTransitioning
            ? "transform 0.5s linear"
            : "none";
        slideTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }, [currentIndex, isTransitioning, slides.length]);

    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <section className="slider-section">
            <button className="slider-control left" onClick={handlePrev}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="slider">
                <div className="slide-track" ref={slideTrackRef}>
                    {slides.concat(slides).map((slide, index) => (
                        <div className="slide" key={index}>
                            <img
                                src={require(`../../../assets/images/${slide}`)}
                                alt={`Slider item ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className="slider-control right" onClick={handleNext}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </section>
    );
};

export default Slider;
