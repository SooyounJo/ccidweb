"use client";

import { ABOUT_SECTIONS } from "./aboutData";

// 하단 보라색 그라데이션 스트립.
// 현재 단계 이후의 제목들만 "다음에 올 섹션"처럼 보여주고,
// 단계가 진행되면 해당 제목이 자연스럽게 페이드아웃되도록 합니다.

function DescItem({ title, isVisible }) {
  return (
    <li
      className={`lg:flex items-center overflow-hidden transition-all duration-700 ease-out
      ${
        isVisible
          ? "opacity-100 h-[76px] mb-[1px]"
          : "opacity-0 h-0"
      }`}
      style={{
        width: "44.27%",
        background:
          "linear-gradient(180deg, #F0F0ED 21.39%, #DFCDE4 100%)",
      }}
    >
      <div className="leading-none text-[6vw] md:text-[5vw] lg:text-[2.4vw] tracking-[-0.03em] px-[2.1vh] lg:px-[5vw] text-left">
        {title}
      </div>
    </li>
  );
}

export default function Desc({ activeId }) {
  // 현재 활성 단계의 인덱스
  const activeIndex = ABOUT_SECTIONS.findIndex(
    (section) => section.id === activeId
  );

  // who 를 제외한 하단 섹션들만 사용 (sectors, methodology)
  const sections = ABOUT_SECTIONS.filter((section) => section.id !== "who");

  return (
    <ul className="w-full px-0 text-primaryB pb-[4vh] flex flex-col">
      {sections.map((section) => {
        const sectionIndex = ABOUT_SECTIONS.findIndex(
          (s) => s.id === section.id
        );
        // 현재 단계 이후(id index가 더 큰 섹션)만 표시
        const isVisible = sectionIndex > activeIndex;

        return (
          <DescItem
            key={section.id}
            title={section.title}
            isVisible={isVisible}
          />
        );
      })}
    </ul>
  );
}
