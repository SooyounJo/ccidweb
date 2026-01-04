"use client";
import LanguageToggle from "./lang";
import { programme } from "@/fonts/fonts";
import { useState, useRef, useEffect } from "react";

export default function Nav({ sectionOn }) {
  const [boxPosition, setBoxPosition] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const linkRefs = useRef([]);

  const calculatePositionAndWidth = (index) => {
    const linkElement = linkRefs.current[index];
    if (linkElement) {
      const linkWidth = linkElement.offsetWidth;
      const linkOffsetLeft = linkElement.offsetLeft;
      const remToPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const additionalWidth = 2 * remToPx;

      return {
        position: linkOffsetLeft - 1 * remToPx, // Adjust position by subtracting 0.75rem
        width: linkWidth + additionalWidth,
      };
    }
    return { position: 0, width: 0 }; // Default fallback
  };

  // Set initial position and width based on sectionOn
  useEffect(() => {
    const sections = ["about", "works", "members", "contact"];
    const index = sections.indexOf(sectionOn); // Find the index of the section group
    if (index !== -1 && isHovered) {
      const { position, width } = calculatePositionAndWidth(index);
      setBoxPosition(position);
      setBoxWidth(width);
    }
  }, [sectionOn, isHovered]);

  const handleHover = (e, index) => {
    setIsHovered(true);
    const { position, width } = calculatePositionAndWidth(index);
    setBoxPosition(position);
    setBoxWidth(width);
  };

  const resetToSection = () => {
    const sections = ["about", "works", "members", "contact"];
    const index = sections.indexOf(sectionOn);
    if (index !== -1) {
      const { position, width } = calculatePositionAndWidth(index);
      setBoxPosition(position);
      setBoxWidth(width);
    }
  };

  return (
    <div
      className={`${programme.className} text-white hidden lg:block z-[500]`}
    >
      <ul className=" z-[500] font-[300] leading-tight lg:text-[1.2vw] fixed top-0 pt-4 mx-auto w-[100%] transition-all duration-300 transform">
        <LanguageToggle sectionOn={sectionOn} />

        <div className="group z-[500] gap-12 4xl:gap-20 lg:flex justify-center ">
          <span
            className={`select-none z-[-1] transition-all duration-300 ease-out absolute px-2 border-[.12vw] ${
              !isHovered ? 'opacity-0' : 'opacity-100'
            } ${
              sectionOn === "cover"
                ? "border-transparent group-hover:border-primaryW"
                : "border-primaryB"
            }`}
            style={{
              height: "1.6vw",
              width: `${boxWidth}px`,
              left: `${boxPosition}px`,
            }}
          ></span>
          {[
            { id: "#about", label: "about" },
            { id: "#works", label: "works" },
            { id: "#members", label: "people" },
            { id: "#contact", label: "contact" },
          ].map(({ id, label }, index) => (
            <li
              key={id}
              onMouseEnter={(e) => handleHover(e, index)}
              onMouseLeave={resetToSection}
            >
              <a
                href={id}
                ref={(el) => (linkRefs.current[index] = el)}
                className={`transition-all mx-3 duration-300 ${
                  sectionOn === "cover" ? "text-primaryW" : "text-primaryB"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
