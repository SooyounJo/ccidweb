"use client";
import { useEffect, useState } from "react";
import { useLanguageStore } from "../../store/languageStore";
import { neuehaas, pxGrotesk } from "@/fonts/fonts";

// 프론트 전용: 백엔드(/api/sheets) 대신 정적인 about 텍스트만 사용
// 0번째 요소의 [0] = 영문, [1] = 한글 본문으로 사용됩니다.
const aboutInfoStatic = [
  [
    "Founded in 2015 at Carnegie Mellon University, QrST is a global design convergence collective. We work across computational design, creative technology, and experience innovation.",
    "QrST는 카네기멜론대학교 Computational Creativity Lab에 이어 한국예술종합학교에 설립된 디자인 콜렉티브입니다. 우리는 컴퓨테이셔널 디자인 프로세스와 방법론을 통해 첨단기술과 창의성 사이에서 의미있고 실현가능한 새로운 가능성을 발굴합니다.",
  ],
];

export default function About() {
  const [aboutInfo] = useState(aboutInfoStatic);
  const { lang } = useLanguageStore();

  return (
    <div className={`${pxGrotesk.className} lg:flex gap-[4vw] items-start justify-start w-full min-h-[40dvh] py-[6vh] lg:py-[14vh] leading-[1.1] text-[6vw] md:text-[5vw] lg:text-[3.5vw]`}>
      <div className={`${pxGrotesk.className} text-primaryB flex-1 pl-6 lg:pl-10`}>
        {aboutInfo.length > 0 ? (
          <pre className={`${pxGrotesk.className} ${lang === 'en' ? 'leading-[1.55] text-[3vw] md:text-[2.85vw] lg:text-[1.15vw]' : 'leading-[1.8] text-[3.1vw] lg:text-[1.1vw]'} whitespace-pre-wrap mb-[4vh]`}>{lang === 'en' ? aboutInfo[0][0] : aboutInfo[0][1]}</pre>
        ) : (
          <p className='leading-[1.55] text-[3vw] md:text-[2.85vw] lg:text-[1.15vw]'>Loading...</p>
        )}
      </div>
    </div>
  );
}