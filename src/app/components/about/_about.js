 "use client";

import { ABOUT_SECTIONS } from "./aboutData";

// 상단 about 섹션의 좌측 제목 + 우측 텍스트를 보여주는 컴포넌트입니다.
// 어떤 섹션을 보여줄지는 activeId / onChange 로 제어합니다.

export default function AboutIntro({ activeId, onChange }) {
  const activeSection =
    ABOUT_SECTIONS.find((section) => section.id === activeId) ||
    ABOUT_SECTIONS[0];
  const safeParagraphs = Array.isArray(activeSection.paragraphs)
    ? activeSection.paragraphs
    : [];

  return (
    <div className="w-full relative z-10 px-[2.1vh] lg:px-[5vw]">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* 좌측: 제목 */}
        <div className="lg:w-[40%]">
          <h2 className="text-left font-[500] leading-tight transition-all duration-300 text-[7vw] md:text-[4vw] lg:text-[3.5vw]">
            {activeSection.title}
          </h2>
        </div>

        {/* 우측: 현재 선택된 섹션의 텍스트 (가로 너비 확대) */}
        <div className="w-full lg:w-[52%] lg:ml-auto lg:pr-[5vw]">
          {safeParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[3.2vw] md:text-[2.3vw] lg:text-[1.15vw] leading-[1.9] ${
                index > 0 ? "mt-6" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// const aboutInfo = [
//   {
//     title:"Founded in 2015 at Carnegie Mellon University, QrST is a global design convergence collective",
//     description: "QrST는 카네기멜론대학교 Computational Creativity Lab에 이어 한국예술종합학교에 설립된 디자인 콜렉티브 이니셔티브입니다. 우리는 컴퓨테이셔널 디자인 프로세스와 방법론을 통해 첨단기술과 창의성 사이에서 의미있고 실현가능한 새로운 가능성을 발굴합니다."
//   },
//   {
//     title: "Collaborating with international partners, we push the boundaries of innovation and creativity",
//     description: "QrST는 국제적인 협력 관계를 가지며 스튜디오, 리서치, 랩으로 나뉩니다. 스튜디오 팀은 다양한 뉴미디어 에이전시, 디자인 스튜디오와 협업하며 트랜스미디어 브랜딩, 미디어 아트 등 커머셜 프로젝트를 진행합니다. 리서치 팀은 인공지능 상호작용 기반의 선행적인 컨셉 디자인과 사용자 경험 디자인 및 연구, 특히 정량, 정성 데이터 수집, 분석 및 시각화에 전문성을 가지고 있습니다. 랩 팀은 디자인 이외 공학, 의학 등 연구중심대학 및 연구소와 협력을 통해 다가올 미래의 새로운 가치를 탐색합니다."
//   }
// ];
