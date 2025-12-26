"use client";
 
// 프론트 전용: 정적인 멤버 데이터 사용
const membersStatic = {
  "Directors": [
    [
      "Directors",
      "Name A",
      "/img/bg.png",
      "Director",
      "Design research, computational creativity, and system design.",
    ],
  ],
  "Members": [
    [
      "Members",
      "Name B",
      "/img/bg.png",
      "Designer",
      "Experience design, visual communication, and prototyping.",
    ],
    [
      "Members",
      "Name C",
      "/img/bg.png",
      "Researcher",
      "Data‑driven interaction, AI‑assisted tools, and visualization.",
    ],
  ],
};

import { useState } from "react";
import { pxGrotesk, neuehaas } from "@/fonts/fonts";
import { useLanguageStore } from "@/app/store/languageStore";

export default function Members() {
  // 정적인 멤버 데이터 사용
  const [membersInfo] = useState(membersStatic);
  const isLoading = false;
  const { lang } = useLanguageStore();

  const textStyle = "leading-none text-[6vw] md:text-[5vw] lg:text-[2.4vw]";
  const textStyleKr = "leading-[1.3] mt-[-0.3vh] text-[5vw] md:text-[4.5vw] lg:text-[2.2vw]";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg md:text-xl">Loading members...</p>
      </div>
    );
  }

  const categories = Object.entries(membersInfo);
  const firstCategory = categories[0]; // 첫 번째 키
  const otherCategories = categories.slice(1); // 나머지 키들

  return (
    <div className="py-[10dvh] text-primaryC">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg md:text-xl">Loading members...</p>
        </div>
      ) : (
        <>
          {firstCategory && (
            <div className="mb-20 lg:mb-[7vh]">
              <h1 className="leading-[1.8] text-[3.7vw] md:text-[2.9vw] lg:text-[1.05vw] mb-[1.6vh]">
                {firstCategory[0]}
              </h1>
              {firstCategory[1].map((member, index) => (
                <div key={index} className="md:flex gap-8 lg:gap-6 xl:gap-[3vw]">
                  <img
                    src={member[2]}
                    alt={`${member[1]} profile`}
                    className="filter grayscale flex-shrink-0 mr-4 w-[11vw] h-[11vw] min-w-[140px] min-h-[140px] rounded-full object-cover object-top"
                  />
                  <div className="md:flex-1">
                    <h2 className="leading-[1.1] text-[16px] md:text-[26px] lg:text-[18px] pt-[1.5vh] mt-[4]">{member[1]}</h2>
                    <pre className={`${pxGrotesk.className} pt-[0.5vh] whitespace-pre-wrap leading-[1.1] text-[14px] md:text-[18px] lg:text-[16px]`}>{member[3]}</pre>
                    <div className="border-l-[1px] border-current mt-[2.5] pl-3 lg:pl-[0.5vw]">
                      {/* <h3 className="pb-3 md:pb-2 leading-[1.3] text-[3vw] md:text-[1.9vw] lg:text-[0.8vw]">Career</h3> */}
                      <div className="leading-[1.3] text-[12px] md:text-[18px] lg:text-[14px] mt-1">
                        <pre
                          className={`whitespace-pre-wrap ${pxGrotesk.className}`}
                        >
                          {member[4]}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {otherCategories.map(([category, members]) => (
            <div key={category} className="mb-12 md:mb-20 lg:mb-[5vh]">
              <h1 className="leading-[1.8] text-[3.7vw] md:text-[2.9vw] lg:text-[1.05vw] mb-[2vh]">
                {category}
              </h1>
              <ul className="md:flex flex-wrap">
                {members.map((member, index) => (
                  <li
                    key={index}
                    className="pb-[1.5vh] lg:pb-[2vh] md:w-1/2 lg:w-1/4 flex items-center"
                  >
                    <img
                      src={member[2]}
                      alt={`${member[1]} profile`}
                      className="filter grayscale flex-shrink-0 mr-4 w-[6vw] h-[6vw] min-w-[70px] min-h-[70px] rounded-full object-cover object-top"
                    />
                    <div className="flex flex-col justify-center pr-3 lg:pt-0 lg:pl-2 min-w-[180px] ">
                      <h3
                        className={`${pxGrotesk.className} pb-1 leading-[1.1] text-[16px] md:text-[18px] lg:text-[15px]`}
                      >
                        {member[1]}
                      </h3>
                      {member[3] && (
                        <h2 className="pb-1 leading-none text-[12px] md:text-[14px] lg:text-[14px]">
                          {member[3]}
                        </h2>
                      )}{" "}
                      <pre
                        className={`whitespace-pre-wrap  ${
                          member[3]
                            ? "leading-tight text-[12px] md:text-[14px] lg:text-[14px]"
                            : "leading-[1.18] text-[12px] md:text-[14px] lg:text-[14px]"
                        } ${pxGrotesk.className}`}
                      >
                        {member[4]}
                      </pre>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
