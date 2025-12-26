"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/store/languageStore";
import { pxGrotesk, neuehaas, programme} from "@/fonts/fonts";
import { sheetsStatic } from "@/app/data/sheetsStatic";
import GreyPlaceholder from "@/app/components/common/GreyPlaceholder";

export default function Works({ textColor }) {
  const [worksInfo, setWorksInfo] = useState(sheetsStatic?.works || []);
  const { lang } = useLanguageStore();
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    setWorksInfo(sheetsStatic?.works || []);
  }, []);

  const rows = Array.isArray(worksInfo) ? worksInfo : [];
  // The sheet is organized in 3-row blocks:
  // [yearsRow, enTitlesRow, krTitlesRow] repeated.
  // 2022~2020 lives in the 2nd block, so we must parse all blocks (like the previous list UI did).
  const normalizeOneLine = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
  const selectedHeaderRaw = "Selected Projects";

  const parseBlock = (baseIdx) => {
    const yearsRow = rows[baseIdx] || [];
    const enRow = rows[baseIdx + 1] || [];
    const krRow = rows[baseIdx + 2] || [];

    const titleRow =
      (lang === "en" ? enRow : krRow) && (lang === "en" ? enRow : krRow).length > 0
        ? (lang === "en" ? enRow : krRow)
        : enRow;

    const out = [];
    let currentYear = "";
    const colCount = Math.max(yearsRow.length, enRow.length, krRow.length);

    for (let j = 1; j < colCount; j += 1) {
      const yr = normalizeOneLine(yearsRow?.[j]);
      if (/^\d{4}$/.test(yr)) currentYear = yr;

      const titleRaw = normalizeOneLine(titleRow?.[j]);
      if (!titleRaw) continue;

      const parts = titleRaw.split(":");
      const client = parts.length > 1 ? parts[0].trim() : "";
      const project = parts.length > 1 ? parts.slice(1).join(":").trim() : titleRaw;

      const tagsByClient2025 = {
        "LG Electronics": ["#Cooperation", "#CX"],
        "CJ CGV & Naver Cloud": ["#Cooperation", "#UX"],
        "Hyundai Motors": ["#Cooperation", "#UX"],
        "Ministry of Trade, Industry and Energy": ["#Cooperation", "#UX"],
      };
      const tags =
        currentYear === "2025" && tagsByClient2025[client]
          ? tagsByClient2025[client]
          : [];

      out.push({
        year: currentYear,
        title: titleRaw,
        client,
        project,
        tags,
      });
    }

    return out;
  };

  const selectedProjects = [];
  for (let i = 0; i < rows.length; i += 3) {
    const blockProjects = parseBlock(i);
    if (blockProjects.length === 0) continue;
    selectedProjects.push(...blockProjects);
  }

  const INITIAL_YEAR = "2025";
  const MIN_YEAR = 2020;
  const inRangeTo2020 = (p) => {
    const y = Number(p?.year);
    return Number.isFinite(y) && y >= MIN_YEAR && y <= Number(INITIAL_YEAR);
  };

  const projectsInRange = selectedProjects.filter(inRangeTo2020);
  const visibleProjects = (isExpanded
    ? projectsInRange
    : projectsInRange.filter((p) => p.year === INITIAL_YEAR)
  );

  const hasMore = projectsInRange.some((p) => p.year !== INITIAL_YEAR);
  const toggleLabel = isExpanded ? (lang === "kr" ? "접기" : "Collapse") : (lang === "kr" ? "더보기" : "More");

  return (
    <>
      <div
        className={`text-primaryB pt-[12%] pb-[80%] ${lang === 'kr' ? 'lg:pt-[4dvh]' : 'lg:pt-[8%]'} lg:pb-[10%] lg:px-[5vw] w-full h-full font-[400] `}
      >
        {visibleProjects.length > 0 ? (
          <div className="text-primaryC bg-[rgba(240,240,236,0.55)] backdrop-blur-[2px]">
            {/* Header row */}
            <div className="border-b-2 border-primaryC py-4 lg:py-5">
              <div
                className={`${neuehaas.className} tracking-[-0.03em] leading-none whitespace-nowrap text-[6.8vw] md:text-[4.6vw] lg:text-[2.8vw]`}
              >
                {selectedHeaderRaw}
              </div>
            </div>
            {visibleProjects.map((p, idx) => (
              <div
                key={`${p.year}-${idx}-${p.title}`}
                className="border-b-2 border-primaryC pt-7 pb-12 lg:pt-9 lg:pb-16"
              >
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Left: Title + Year */}
                  <div className="col-span-12 lg:col-span-3">
                    <div className={`${neuehaas.className} tracking-[-0.03em] leading-[1.05]`}>
                      <div className="text-[5.8vw] md:text-[4.1vw] lg:text-[1.9vw]">
                        {p.client ? p.client.toUpperCase() : p.project.toUpperCase()}
                      </div>
                      <div className={`${pxGrotesk.className} text-[4.8vw] md:text-[3.4vw] lg:text-[1.25vw] mt-1`}>
                        {p.year || ""}
                      </div>
                    </div>
                          </div>
                        
                  {/* Middle: meta */}
                  <div className="col-span-12 lg:col-span-4">
                    {/* Tags (2025 only) + details */}
                    <div className={`${pxGrotesk.className} flex flex-col gap-3 text-[3.2vw] md:text-[2.3vw] lg:text-[0.9vw] leading-[1.5]`}>
                      {Array.isArray(p.tags) && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-start">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              // Match the height of the (previous) label capsules: same py + leading
                              className="inline-flex items-center rounded-full bg-primaryC px-3 py-1.5 leading-none text-[3vw] md:text-[2vw] lg:text-[0.8vw] text-white"
                            >
                              {t}
                                      </span>
                          ))}
                        </div>
                      )}

                      {p.client && (
                        <div className="min-w-0 break-words">
                          <span className="opacity-70">Client:</span> {p.client}
                        </div>
                      )}
                      <div className="min-w-0 break-words">
                        <span className="opacity-70">Project:</span> {p.project}
                      </div>
                    </div>
                  </div>

                  {/* Right: image boxes (grey-toned) */}
                  <div className="col-span-12 lg:col-span-5">
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
                      <GreyPlaceholder className="w-full rounded-sm aspect-[16/9]" />
                      <GreyPlaceholder className="w-full rounded-sm aspect-[16/9]" />
                      <GreyPlaceholder className="w-full rounded-sm aspect-[16/9] hidden xl:block" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="pt-10 pb-14 lg:pt-12 lg:pb-16 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded((v) => !v)}
                  className={`${pxGrotesk.className} border-2 border-primaryC px-6 py-3 lg:px-7 lg:py-3 rounded-full text-[3.2vw] md:text-[2.1vw] lg:text-[0.9vw] text-primaryC hover:bg-primaryC hover:text-primaryW transition-colors`}
                >
                  {toggleLabel}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}