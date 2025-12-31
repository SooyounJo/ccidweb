"use client";

import { useEffect, useRef, useState } from "react";
// import "./multilingual.css";
import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import Navmobile from "./components/nav/navmobile";

import Cover from "./components/landing/cover";
import About from "./components/about/about";
import Keywords from "./components/about/keywords";
import Desc from "./components/about/desc";
import Works from "./components/works/works";
import Members from "./components/members";
import Contact from "./components/contact/contact";
import { sheetsStatic } from "@/app/data/sheetsStatic";
import GradualBlurTop from "./components/common/GradualBlurTop";

export default function Home() {
  const mainRef = useRef(null);
  const BASE_BG = "#f0f0ec"; // 기본 라이트(전체)
  const BASE_TEXT = "#0f0f13"; // 기본 블랙(전체)
  const [membersBlend, setMembersBlend] = useState(0); // 0..1 (People 섹션만)
  const [borderRadius, setBorderRadius] = useState(9999); // 초기값: rounded-full
  const [sectionOn, setSectionOn] = useState("cover");
  const [aboutInfo, setAboutInfo] = useState(sheetsStatic?.about || []);

  useEffect(() => {
    setAboutInfo(sheetsStatic?.about || []);
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const sections = mainEl.querySelectorAll("section");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionOn(entry.target.id); // 보이는 섹션의 ID를 저장
        }
      },
      { threshold: 0.1, root: mainEl } // main 스크롤 기준
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Smooth background transition when entering/leaving the People section (no hard cut, no flicker).
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const membersSection = mainEl.querySelector("#members");
    if (!membersSection) return;

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use intersection ratio to blend colors smoothly.
        // We start blending after a small entry to avoid jitter at the boundary.
        const raw = entry?.intersectionRatio ?? 0;
        // Spread the transition a bit more so it feels more gradual.
        const t = clamp01((raw - 0.03) / 0.55);
        setMembersBlend(t);
      },
      { threshold: thresholds, root: mainEl } // main 스크롤 기준
    );

    observer.observe(membersSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const contactSection = document.querySelector("#contact");

    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.requestAnimationFrame(() => {
          const ratio = Math.min(entry.intersectionRatio, 0.8);
          const maxRadius = 9999; // rounded-full (최대)
          const mappedRadius = Math.round(maxRadius * (1 - ratio / 0.8));

          setBorderRadius(mappedRadius); // 상태 업데이트
        });
      },
      { threshold: Array.from({ length: 9 }, (_, i) => i * 0.1) }
    );

    observer.observe(contactSection);

    return () => observer.unobserve(contactSection);
  }, []);

  return (
    <div
      className="w-[100%] absolute scrollbar-hide bg-white z-[-2] overflow-x-hidden"
      // onMouseMove={handleMouseMove}
    >
      {/* ReactBits-style gradual blur under the top navigation */}
      <GradualBlurTop sectionOn={sectionOn} />
      <Header sectionOn={sectionOn} />
      <Nav sectionOn={sectionOn} />

      <Navmobile sectionOn={sectionOn} />

      <div
        style={{
          transition: "top 0.5s ease-in-out, opacity 3s ease-in-out",
          opacity: sectionOn === "cover" ? "1" : "0",
          top: sectionOn === "cover" ? "0" : "-100%",
        }}
        className={`left-0 fixed bg-[url('/img/bgt.png')] bg-repeat bg-contain bg-center w-full h-[118dvh]`}
      ></div>

      <main
        ref={mainRef}
        style={{
          background: BASE_BG, // 전체 배경은 항상 라이트(화이트)
          color: BASE_TEXT,
          borderColor: BASE_TEXT,
        }}
        className={`scrollbar-hide z-10 h-[100dvh] w-[100%] overflow-y-scroll snap-y snap-mandatory`}
      >
        <section
          id="cover"
          className="relative w-[100%] h-[100%] snap-start flex items-center justify-center"
        >
          <Cover textColor={BASE_TEXT} />
        </section>
        <section
          id="about"
          className="relative w-[100%] min-h-[100dvh] snap-start pt-20 lg:pt-18 4xl:pt-[3%] px-0 lg:px-0 content-center"
        >
          <Desc sectionOn={sectionOn} /> 
        </section>
        <section
          id="works"
          className={`transition-all duration-1000 lg:content-center w-full relative min-h-[100dvh] snap-start`}
        >
          <Works textColor={BASE_TEXT} sectionOn={sectionOn} />
        </section>
        <section
          id="members"
          style={(() => {
            // Only this section blends to purple; cap the max blend so the purple stays a bit lighter.
            const clamp01 = (n) => Math.max(0, Math.min(1, n));
            const lerp = (a, b, t) => Math.round(a + (b - a) * t);
            const t = clamp01(membersBlend) * 0.7; // max 70% tint

            const base = { r: 240, g: 240, b: 236 }; // #f0f0ec
            const purple = { r: 193, g: 184, b: 251 }; // #c1b8fb
            const bg = `rgb(${lerp(base.r, purple.r, t)}, ${lerp(base.g, purple.g, t)}, ${lerp(
              base.b,
              purple.b,
              t
            )})`;

            // Text tint eases in quickly so readability stays consistent.
            const textT = clamp01(membersBlend / 0.35);
            const text = `rgba(93, 0, 156, ${textT})`;

            return {
              backgroundColor: bg,
              color: text,
            };
          })()}
          className="relative w-[100%] min-h-[100dvh] snap-start md:p-28 p-6 lg:px-[12%]"
        >
          {/* Soft gradient edges so the transition doesn't look like a hard cut */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-full h-[28vh] z-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(240,240,236,1) 0%, rgba(240,240,236,0.65) 35%, rgba(240,240,236,0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 w-full h-[28vh] z-0"
            style={{
              background:
                "linear-gradient(to top, rgba(240,240,236,1) 0%, rgba(240,240,236,0.65) 35%, rgba(240,240,236,0) 100%)",
            }}
          />

          <div className="relative z-10">
            <Members />
          </div>
        </section>
        <section
          id="contact"
          className="relative w-[100%] h-[100dvh] snap-end md:p-28 xl:p-40 p-6 content-center"
        >
          <Contact borderRadius={borderRadius} sectionOn={sectionOn}/>
          <footer className="transition duration-500 text-primaryB absolute bottom-0 left-0 w-full h-auto text-center p-4 md:p-8 font-[400] leading-[1.5] text-[2.6vw] md:text-[1.8vw] lg:text-[0.9vw] xl:text-[0.75vw]">
            
            {aboutInfo?.[0]?.[3] || "© 2025. All rights reserved."}
          </footer>
        </section>
      </main>
    </div>
  );
}
