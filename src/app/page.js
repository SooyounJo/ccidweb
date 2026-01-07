"use client";

import { useEffect, useRef, useState } from "react";
// import "./multilingual.css";
import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import Navmobile from "./components/nav/navmobile";

import Cover from "./components/landing/cover";
import LiquidBackground from "./components/landing/liquidBackground";
import AboutIntro from "./components/about/_about";
import Desc from "./components/about/desc";
import Works from "./components/works/works";
import Members from "./components/members";
import Contact from "./components/contact/contact";

const ABOUT_ORDER = ["who", "sectors", "methodology"];

export default function Home() {
  // 기본 배경/텍스트 색상 (기존처럼 밝은 회색 배경 유지)
  const [bgColor, setBgColor] = useState("#f0f0ec");
  const [textColor, setTextColor] = useState("#0f0f13");
  const [borderRadius, setBorderRadius] = useState(9999); // 초기값: rounded-full
  const [sectionOn, setSectionOn] = useState("cover");
  const [activeAboutId, setActiveAboutId] = useState("who"); // about 내부 단계
  const [isAboutLocked, setIsAboutLocked] = useState(false); // about 화면 고정 여부
  const mainRef = useRef(null);
  const currentSectionRef = useRef("cover");
  const lastStepTimeRef = useRef(0);
  const aboutLockTimeRef = useRef(0);

  // 현재 뷰포트에 보이는 섹션이 어떤 그룹인지 추적 (about/works/members/contact 등)
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const key = entry.target.dataset.section || entry.target.id;
        if (key === currentSectionRef.current) return;

        currentSectionRef.current = key;
        setSectionOn(key);

        // about 섹션으로 새로 진입했을 때: 첫 단계로 리셋 + 잠금 ON
        if (key === "about") {
          setActiveAboutId("who");
          setIsAboutLocked(true);
          aboutLockTimeRef.current = Date.now();
          lastStepTimeRef.current = Date.now();
        } else {
          // 다른 섹션으로 나가면 잠금 해제
          setIsAboutLocked(false);
        }
      },
      { threshold: 0.4 } // about 이 화면에 충분히 들어왔을 때만 진입으로 간주
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // about 섹션 안에서만 스크롤로 about 단계(who → sectors → methodology)를 전환
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleWheel = (e) => {
      // about 에 도달했지만 아직 잠금이 설정되지 않았다면
      // 첫 휠 이벤트에서 잠금만 걸고 단계 전환은 하지 않는다.
      if (!isAboutLocked) {
        const now = Date.now();
        setIsAboutLocked(true);
        aboutLockTimeRef.current = now;
        lastStepTimeRef.current = now;
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (delta === 0) return;

      const now = Date.now();

      // about 에 막 진입한 직후의 휠 제스처는 단계 전환에 사용하지 않음
      if (now - aboutLockTimeRef.current < 400) {
        e.preventDefault();
        return;
      }
      // 너무 빠른 연속 입력은 한 단계만 처리하도록 스로틀링
      if (now - lastStepTimeRef.current < 400) {
        e.preventDefault();
        return;
      }

      const currentIndex = ABOUT_ORDER.indexOf(activeAboutId);
      const lastIndex = ABOUT_ORDER.length - 1;

      // 아래로 스크롤
      if (delta > 0) {
        if (currentIndex < lastIndex) {
          // 1→2, 2→3: 스크롤을 막고 내용만 다음 단계로 변경
          e.preventDefault();
          lastStepTimeRef.current = now;
          setActiveAboutId(ABOUT_ORDER[currentIndex + 1]);
        } else {
          // 3단계(Our Methodology)에서 한 번 더 내리면:
          // 잠금을 해제하여 다음 섹션(works)로 자연스럽게 이동
          lastStepTimeRef.current = now;
          setIsAboutLocked(false);
        }
        return;
      }

      // 위로 스크롤
      if (delta < 0) {
        if (currentIndex > 0) {
          // 3→2, 2→1: 스크롤을 막고 이전 단계로 변경
          e.preventDefault();
          lastStepTimeRef.current = now;
          setActiveAboutId(ABOUT_ORDER[currentIndex - 1]);
        } else {
          // 1단계(who)에서 위로 올리면 잠금을 해제하여 cover 로 자연스럽게 이동
          lastStepTimeRef.current = now;
          setIsAboutLocked(false);
        }
      }
    };

    mainEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => mainEl.removeEventListener("wheel", handleWheel);
  }, [isAboutLocked, activeAboutId]);

  useEffect(() => {
    const worksSection = document.querySelector("#works");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgColor("#c1b8fb"); // Works 섹션 배경색
          setTextColor("#5d009c"); // Works 섹션 글자색
        } else {
          // 기본 밝은 회색 배경 / 어두운 텍스트
          setBgColor("#f0f0ec");
          setTextColor("#0f0f13");
        }
      },
      { threshold: 0.1 } // Works 섹션 10% 보이면 작동
    );

    if (worksSection) observer.observe(worksSection);

    return () => {
      if (worksSection) observer.unobserve(worksSection);
    };
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
      <Header sectionOn={sectionOn} />
      <Nav sectionOn={sectionOn} />

      <Navmobile sectionOn={sectionOn} />

      {/* 기존 보라색 그라데이션 배경 이미지 (커버 섹션에서만 보이도록) */}
      <div
        style={{
          transition: "opacity 1.5s ease-in-out",
          opacity: sectionOn === "cover" ? "1" : "0",
          top: 0,
          visibility: sectionOn === "cover" || sectionOn === "about" ? "visible" : "hidden"
        }}
        className={`left-0 fixed bg-[url('/img/bgt.png')] bg-repeat bg-contain bg-center w-full h-[118dvh] z-[-1]`}
      ></div>

      {/* three.js 리퀴드 그라데이션 (보라 배경 위, 콘텐츠 아래) */}
      <div
        style={{
          transition: "opacity 1.5s ease-in-out",
          opacity: sectionOn === "cover" ? 1 : 0,
          top: 0,
          visibility: sectionOn === "cover" ? "visible" : "hidden"
        }}
        className="left-0 fixed z-0 w-full h-[118dvh] pointer-events-none"
      >
        <LiquidBackground />
      </div>

      <main
        ref={mainRef}
        style={{
          background: bgColor,
          color: textColor,
          borderColor: textColor,
          transition: "background-color 1s ease-in-out",
        }}
        className={`scrollbar-hide z-10 h-[100dvh] w-[100%] overflow-y-scroll snap-y snap-mandatory`}
      >
        <section
          id="cover"
          className="relative w-[100%] h-[100%] snap-start flex items-center justify-center"
        >
          <Cover textColor={textColor} />
          {/* 어바웃 섹션으로의 자연스러운 배경 전환을 위한 그라데이션 레이어 */}
          <div className="absolute bottom-0 left-0 w-full h-[20vh] pointer-events-none z-0 flex">
            <div 
              className="w-[44.27%] h-full" 
              style={{ background: "linear-gradient(to top, #F0F0ED 0%, rgba(240, 240, 237, 0.6) 25%, rgba(240, 240, 237, 0.2) 60%, transparent 100%)" }} 
            />
            <div 
              className="w-[55.73%] h-full" 
              style={{ background: "linear-gradient(to top, #F0F0ED 0%, rgba(240, 240, 237, 0.6) 25%, rgba(240, 240, 237, 0.2) 60%, transparent 100%)" }} 
            />
          </div>
        </section>
        <section
          id="about"
          data-section="about"
          className="relative w-[100%] h-[100dvh] snap-start overflow-hidden"
        >
          {/* 좌측 배경 판 (전체 높이) */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 z-0"
            style={{
              width: "44.27%",
              background: "linear-gradient(180deg, #F0F0ED 54.58%, #DBCDED 100%)",
            }}
          />
          {/* 우측 배경 판 (전체 높이) */}
          <div
            className="hidden lg:block absolute right-0 top-0 bottom-0 z-0"
            style={{
              width: "55.73%",
              background: "linear-gradient(180deg, #F0F0ED 20.43%, #DFCDE4 100%)",
            }}
          />

          {/* 컨텐츠 영역: 모든 단계에서 동일한 상단 기준 위치에 고정 (더 위로 이동) */}
          <div className="relative z-10 w-full h-full flex flex-col justify-start pt-[15vh]">
            <AboutIntro activeId={activeAboutId} onChange={setActiveAboutId} />
          </div>

          {/* 하단 항목: 절대 위치로 배치하여 위 컨텐츠의 레이아웃에 영향을 주지 않음 */}
          <div className="absolute bottom-0 left-0 w-full z-10">
            <Desc activeId={activeAboutId} />
          </div>
        </section>
        <section
          id="works"
          className={`transition-all duration-1000 lg:content-center w-full relative min-h-[100dvh] snap-start`}
        >
          <Works textColor={textColor} />
        </section>
        <section
          id="members"
          className="w-[100%] min-h-[100dvh] snap-start md:p-28 p-6 lg:px-[12%]"
        >
          <Members />
        </section>
        <section
          id="contact"
          className="relative w-[100%] h-[100dvh] snap-end md:p-28 xl:p-40 p-6 content-center"
        >
          <Contact borderRadius={borderRadius} sectionOn={sectionOn}/>
          <footer className="transition duration-500 text-primaryB absolute bottom-0 left-0 w-full h-auto text-center p-4 md:p-8 font-[400] leading-[1.5] text-[2.6vw] md:text-[1.8vw] lg:text-[0.9vw] xl:text-[0.75vw]">
            © 2025. All rights reserved.
          </footer>
        </section>
      </main>
    </div>
  );
}
