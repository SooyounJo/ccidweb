"use client";

import { ABOUT_SECTIONS } from "./aboutData";

// 하단 보라색 그라데이션 스트립.
// 이제 클릭이 아니라 스크롤에 의해 상단 about 텍스트가 바뀌며,
// 이 컴포넌트는 현재 활성화된 섹션을 시각적으로만 표시합니다.

function DescItem({ id, title, isActive }) {
  return (
    <li
      className={`h-auto bg-gradient-to-t from-[rgba(93,0,156,0.2)] via-[rgba(93,0,156,0)] to-[rgba(93,0,156,0)] lg:flex overflow-hidden transition-all duration-700 ease-out py-4 lg:py-[2.2vh] lg:px-[5vw]
      ${isActive ? "opacity-100" : "opacity-70"}`}
    >
      <div
        className="leading-none text-[6vw] md:text-[5vw] lg:text-[2.4vw] tracking-[-0.03em] lg:w-[45%] px-[2.1vh] mb-[1vh] lg:mb-0 text-left"
      >
        {title}
      </div>
    </li>
  );
}

export default function Desc({ activeId }) {
  // who 를 제외한 하단 섹션들만 사용
  const sections = ABOUT_SECTIONS.filter((section) => section.id !== "who");

  return (
    <ul className="border-primaryB w-full px-0 text-primaryB pt-[3%] pb-[4%] flex flex-col">
      {sections.map((section) => (
        <DescItem
          key={section.id}
          id={section.id}
          title={section.title}
          isActive={activeId === section.id}
        />
      ))}
    </ul>
  );
}
