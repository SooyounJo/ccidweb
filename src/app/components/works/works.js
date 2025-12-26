"use client";

import { useState } from "react";
import { useLanguageStore } from "@/app/store/languageStore";
import { pxGrotesk, neuehaas, programme} from "@/fonts/fonts";

// 프론트 전용: 정적인 Works 데이터 사용
// 3행을 하나의 블록으로 사용하는 구조입니다.
// [0] = 연도, [1] = 영문 설명, [2] = 한글 설명
const worksStatic = [
  // block 1
  ["", "2024", ""],
  ["", "Computational design & creative technology projects", ""],
  ["", "컴퓨테이셔널 디자인과 크리에이티브 테크놀로지 기반의 프로젝트를 수행합니다.", ""],
];

export default function Works({ textColor }) {
  const [worksInfo] = useState(worksStatic);
  const { lang } = useLanguageStore();

  return (
    <>
      <div
        className={`text-primaryB pt-[12%] pb-[80%] ${lang === 'kr' ? 'lg:pt-[4dvh]' : 'lg:pt-[8%]'} lg:pb-[10%] lg:px-[5vw] w-full h-full font-[400] `}
      >
        {worksInfo.length > 0 ? (
          worksInfo.map((row, i) =>
            i % 3 === 0
              ? row.map((col, j) => {
                  const year = worksInfo[i][j];
                  const international = lang === 'en' ? worksInfo[i + 1]?.[j] : worksInfo[i + 2]?.[j];

                  if ((year !== undefined && year !== "") || (international !== undefined && international !== "")) {
                    return (
                      <div key={`${i}-${j}`} className="relative">
                        <div
                          className={` ${lang === 'en' ? 'leading-[1.4] mb-[0.5vh]' : 'lg:leading-[1.5] leading-[1.1] mb-[1.1vh] lg:mb-[0.3vh]'} relative flex text-[2.8vw] md:text-[2.4vw] lg:text-[1vw]  
                          `}               
                        > 
                         {/* selected */}
                          <div
                            className={`${j === 1 ? `${lang === 'en' ? 'lg:mt-[0vh]' : 'lg:mt-[2vh]'}` : ''} ${
                              j === 0 ? "hidden" : ""
                            }  ${pxGrotesk.className} flex-[0.35] lg:pl-[22.5%] lg:flex-[0.1] pl-6 lg:pl-12 tracking-1.8`}
                          >
                            {year}
                          </div>
                        
                          <p
                            className={`indent-except-first flex-1 pr-6 ${
                              j === 0 
                                ? i === 0 && j === 0 
                                  ? `${neuehaas.className} lg:flex gap-[4vw] text-primaryB lg:block items-end leading-[1.55] pl-6 tracking-[-0.03] text-[6vw] md:text-[4.5vw] lg:text-[2.2vw] pt-[8dvh] lg:pt-[0dvh] pb-[1dvh] lg:pb-[1dvh]`
                                  : ''
                                : ''
                            }`}
                          >
                            {international && international.includes(':') 
                              ? international.split(':').map((part, index) => {
                                  if (index === 0) {
                                    return (
                                      <span key={index} className="gradient-border pb-0 text-black">
                                        {part}
                                      </span>
                                    );
                                  } else {
                                    return <span key={index}>:{part}</span>;
                                  }
                                })
                              : international
                            }
                          </p>
        
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              : null
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}