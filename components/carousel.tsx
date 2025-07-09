import React, { useEffect, useState } from "react";
import HeroBanner from "./hero-banner";
import { CarouselProps } from "../model/component-props/carousel.model";

export default function HeroCarousel(data: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slides = data.carousel || [];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides?.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
    setIsAutoPlaying(false);
  };
  return (
    <>
      <div className="w-full py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {data?.title}
          </h1>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {data?.carousel?.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <HeroBanner key={idx} {...item} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute -bottom-12 left-0 right-0">
              <div className="flex justify-center gap-3">
                {slides?.map((_: unknown, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? "bg-gray-900" : "bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
