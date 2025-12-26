"use client";
import { useEffect, useState } from "react";
import { useLanguageStore } from "../../store/languageStore";
import { pxGrotesk } from "@/fonts/fonts";
import { neuehaas } from "@/fonts/fonts";

// 프론트 전용: 백엔드(/api/sheets) 대신 정적인 데이터만 사용합니다.
// 필요하면 아래 aboutInfo 배열을 수정해서 내용만 바꿔 사용하세요.
const aboutInfo = [
  // [영문 제목, 영문 설명, 한글 제목, 한글 설명, 이미지 URL(optional)]
  [
    "Computational Creativity & Design Research Studio",
    "We explore new possibilities at the intersection of design, data, and emerging technologies.",
    "컴퓨테이셔널 크리에이티비티 & 디자인 리서치 스튜디오",
    "디자인, 데이터, 첨단 기술이 만나는 지점에서 새로운 가능성을 탐구합니다.",
    "",
  ],
  [
    "From speculative concepts to real-world services",
    "Projects span from experimental prototypes to large-scale deployments with global partners.",
    "실험적인 프로토타입부터 실제 서비스까지",
    "국내외 파트너와 함께 실험적인 프로토타입부터 실제 서비스까지 폭넓게 협업합니다.",
    "",
  ],
];

function DescItem({ id, title, description, imageUrl }) {
  const textStyle =
    "leading-none text-[6vw] md:text-[5vw] lg:text-[2.4vw]";
  const textStyleKr =
    "leading-[1.3] mt-[-0.3vh] text-[5vw] md:text-[4.5vw] lg:text-[2.2vw]";
  const { lang } = useLanguageStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image when component mounts
  useEffect(() => {
    if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <li className="h-auto bg-gradient-to-t from-[rgba(93,0,156,0.2)] via-[rgba(93,0,156,0)] to-[rgba(93,0,156,0)] lg:flex group overflow-hidden transition-all duration-700 ease-out py-2 lg:py-[2vh] lg:px-[5vw]">
      <h3  
        className={`${lang === 'en' ? textStyle : textStyleKr} ${neuehaas.className} lg:w-[52%] tracking-[-0.03] pt-[0.8em] px-[2.1vh] lg:mr-[1vw] mb-[1vh] lg:mb-[2vh]`}
      >
        {title}
      </h3>
      <div className="w-full lg:w-[48%]">
        {typeof imageUrl === "string" && imageUrl.startsWith("http") && (
          <div className="w-full mb-[1.3vw]">
            {imageLoaded ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto object-cover rounded-md transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-200 rounded-md animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Loading...</span>
              </div>
            )}
          </div>
        )}
        <pre className={`whitespace-pre-wrap ${pxGrotesk.className} lg:pt-[2.3em] pt-[.3em] px-[1.8vh] pr-[3.8vh] pb-[3.8vh] ${lang === 'en' ? 'leading-[1.3] lg:leading-[1.38] text-[2.8vw] md:text-[2.4vw] lg:text-[1vw]' : 'leading-[1.8] text-[3.1vw] lg:text-[1.1vw]'} text-primaryB transition-all duration-700 ml-[4px] w-full`}>
          {description}
        </pre>
      </div>
    </li>
  );
}

export default function Desc() {
  const { lang } = useLanguageStore();

  return (
    <ul className="border-primaryB w-full h-full mt-[1.3vw] px-0 text-primaryB pt-[8%] pb-[18%] flex flex-col">
      {aboutInfo.map((item, i) => (
        <DescItem
          key={i}
          id={String(i + 1).padStart(2, "0")}
          title={lang === 'en' ? item[0] : item[2]}
          description={lang === 'en' ? item[1] : item[3]}
          imageUrl={item[4]}
        />
      ))}
    </ul>
  );
}
