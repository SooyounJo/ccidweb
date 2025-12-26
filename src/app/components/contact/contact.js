"use client";
import { useEffect, useState } from "react";
import "./contact.css";
export default function Contact({ borderRadius, sectionOn }) {
  // 프론트 전용: 고정 이메일 사용 (원하는 주소로 수정하세요)
  const contactEmail = "hello@qrst.studio";

  useEffect(() => {
    const interBubble = document.querySelector(".interactive");
    if (!interBubble) return;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 10;
      curY += (tgY - curY) / 10;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    function onMouseMove(event) {
      tgX = event.clientX;
      tgY = event.clientY;
    }

    window.addEventListener("mousemove", onMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      // style={{ borderRadius: `${borderRadius}px` }}
      className={`transition-all duration-[1000ms] ease-out absolute top-0 left-0 w-full h-full gradient-bg`}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g5"></div>
        <div className="interactive"></div>
      </div>

      {/* purple tone layer */}
      <div
        className="bg-[rgba(164,106,251,0.3)] absolute top-0 left-0 w-full h-full"
        style={{ mixBlendMode: "darker" }}
      ></div>

      {/* gradient layer */}
      <div
        className={` ${sectionOn === 'contact' ? 'opacity-0' : 'opacity-100'} transition-opacity delay-[0.5s] duration-[1s] ease-in-out bg-gradient-to-b from-primaryW via-[rgba(93,0,156,0)] via-[rgba(93,0,156,0)] to-[rgba(93,0,156,0)]  absolute top-0 left-0 w-full h-full`}
      ></div>

      {/* 텍스트 */}
      <div className="text-primaryB absolute w-full h-full top-0 left-0 flex flex-col justify-center text-center font-[400] leading-[1.8] text-[3.5vw] md:text-[3vw] lg:text-[1.05vw]">
        <p className="leading-snug z-[1]">
          For business inquiries please contact:
        </p>

        <div className="z-[1]">
          <a
          href={`mailto:${contactEmail}`}
          className="leading-snug pb-1 relative group text-primaryB hover:text-[#000] transition-colors duration-1800"
        >
          {contactEmail}
          <span
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-primaryB transition-all duration-[880ms] ease-in-out group-hover:w-full group-hover:bg-[#000]"
          ></span>
        </a>
        </div>
      </div>
    </div>
  );
}
