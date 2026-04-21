import svgPaths from "./svg-f73dbkgv9v";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 px-[6px] size-[32px] top-[4px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3eab300} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 10.5V15" id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6 10.5V15" id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 12V16.5" id="Vector_4" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[44px] px-[9px] rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[36px] top-0" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[36px] min-h-px min-w-px not-italic relative text-[#020817] text-[30px] tracking-[0.3955px]">Depression</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#64748b] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[639px]">Evidence-based exercises and resources to help you manage depression symptoms and build resilience.</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[92px] items-start left-[92px] top-0 w-[675px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[92px] left-0 top-0 w-[767px]" data-name="Container">
      <Button />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[rgba(79,149,255,0.13)] relative rounded-[16px] shrink-0 size-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1e293b] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Guided Series</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-px whitespace-nowrap">Step-by-step guided program</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function SelfCareResources1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[232.641px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex h-[78px] items-center justify-between left-0 px-[21px] py-px rounded-[16px] top-0 w-[767px]" data-name="Button" style={{ backgroundImage: "linear-gradient(174.193deg, rgb(235, 244, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <SelfCareResources1 />
      <Icon3 />
    </div>
  );
}

function SelfCareResources2() {
  return (
    <div className="absolute h-[28px] left-0 top-[98px] w-[767px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#0f172b] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Exercises</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_2015_667)" id="Icon">
          <path d={svgPaths.p1cd01c00} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p34f9e600} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <clipPath id="clip0_2015_667">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SelfCareResources4() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[20px]" data-name="SelfCareResources">
      <Icon4 />
    </div>
  );
}

function SelfCareResources5() {
  return (
    <div className="absolute h-[40px] left-[20px] top-[80px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[70px]">5-4-3-2-1 Grounding</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[146px] left-0 rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources4 />
      <SelfCareResources5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p1e63b500} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources6() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon5 />
    </div>
  );
}

function SelfCareResources7() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Guided Imagery</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[146px] left-[195.75px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources6 />
      <SelfCareResources7 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_2015_711)" id="Icon">
          <path d={svgPaths.p34f9e600} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p1539a180} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M8.25 8.25H8.26" id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M13.75 8.25H13.76" id="Vector_4" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <clipPath id="clip0_2015_711">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SelfCareResources8() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon6 />
    </div>
  );
}

function SelfCareResources9() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Affirmations</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[146px] left-[391.5px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources8 />
      <SelfCareResources9 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_2015_698)" id="Icon">
          <path d={svgPaths.p2a32f400} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M18.3333 2.75V6.41667" id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M20.1667 4.58333H16.5" id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M3.66667 15.5833V17.4167" id="Vector_4" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M4.58333 16.5H2.75" id="Vector_5" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <clipPath id="clip0_2015_698">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SelfCareResources10() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon7 />
    </div>
  );
}

function SelfCareResources11() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Joyful Activities</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[146px] left-[587.25px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources10 />
      <SelfCareResources11 />
    </div>
  );
}

function SelfCareResources3() {
  return (
    <div className="absolute h-[146px] left-0 top-[142px] w-[767px]" data-name="SelfCareResources">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[288px] left-0 top-[116px] w-[767px]" data-name="Container">
      <Button1 />
      <SelfCareResources2 />
      <SelfCareResources3 />
    </div>
  );
}

function SelfCareResources12() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#0f172b] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">{`To Do's`}</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.pb3a6b80} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources14() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon8 />
    </div>
  );
}

function SelfCareResources15() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Gratitude Tracker</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[142px] left-0 rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources14 />
      <SelfCareResources15 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p21366700} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources16() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[20px]" data-name="SelfCareResources">
      <Icon9 />
    </div>
  );
}

function SelfCareResources17() {
  return (
    <div className="absolute h-[40px] left-[20px] top-[80px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[97px]">Daily Self Care Tracker</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[142px] left-[195.75px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources16 />
      <SelfCareResources17 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_2015_652)" id="Icon">
          <path d={svgPaths.p1aa00} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p26f55e00} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p156dec00} id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p163ea2c0} id="Vector_4" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p334df980} id="Vector_5" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p39cd3e80} id="Vector_6" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p1e61b800} id="Vector_7" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p3c288380} id="Vector_8" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.pd3085d8} id="Vector_9" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <clipPath id="clip0_2015_652">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SelfCareResources18() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon10 />
    </div>
  );
}

function SelfCareResources19() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{`Brain Dump & Sort`}</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[142px] left-[391.5px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources18 />
      <SelfCareResources19 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p242cba00} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p1ed89640} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources20() {
  return (
    <div className="absolute bg-[#ebf4ff] content-stretch flex items-center justify-center left-[20px] px-[13px] rounded-[16px] size-[48px] top-[30px]" data-name="SelfCareResources">
      <Icon11 />
    </div>
  );
}

function SelfCareResources21() {
  return (
    <div className="absolute h-[20px] left-[20px] top-[90px] w-[137.75px]" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1e293b] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Letter to Self</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[142px] left-[587.25px] rounded-[16px] top-0 w-[179.75px]" data-name="Button">
      <SelfCareResources20 />
      <SelfCareResources21 />
    </div>
  );
}

function SelfCareResources13() {
  return (
    <div className="h-[142px] relative shrink-0 w-full" data-name="SelfCareResources">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[186px] items-start left-0 top-[436px] w-[767px]" data-name="Container">
      <SelfCareResources12 />
      <SelfCareResources13 />
    </div>
  );
}

function SelfCareResources22() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="SelfCareResources">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#0f172b] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Resources</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2015_628)" id="Icon">
          <path d="M12.5 15H8.33333" id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 11.6667H8.33333" id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2e7cc000} id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pc16100} id="Vector_4" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2015_628">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#ebf4ff] relative rounded-[16px] shrink-0 size-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28.5px] not-italic text-[#1e293b] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Articles</p>
      </div>
    </div>
  );
}

function SelfCareResources24() {
  return (
    <div className="h-[44px] relative shrink-0 w-[116.664px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container9 />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[18px] not-italic text-[#94a3b8] text-[12px] text-center top-[5px] whitespace-nowrap">24</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[65.156px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text1 />
        <Icon13 />
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white h-[78px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21px] py-px relative size-full">
          <SelfCareResources24 />
          <SelfCareResources25 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pdf995c0} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 15H12.5" id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 18.3333H11.6667" id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#ebf4ff] flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[16px]" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
          <Icon14 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[31.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[16px] not-italic text-[#1e293b] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Tips</p>
      </div>
    </div>
  );
}

function SelfCareResources26() {
  return (
    <div className="h-[44px] relative shrink-0 w-[91.602px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container10 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[17px] not-italic text-[#94a3b8] text-[12px] text-center top-[5px] whitespace-nowrap">18</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[63.648px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text3 />
        <Icon15 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white h-[78px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21px] py-px relative size-full">
          <SelfCareResources26 />
          <SelfCareResources27 />
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p316df500} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1e34ef00} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#ebf4ff] relative rounded-[16px] shrink-0 size-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[26.5px] not-italic text-[#1e293b] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Stories</p>
      </div>
    </div>
  );
}

function SelfCareResources28() {
  return (
    <div className="h-[44px] relative shrink-0 w-[112.25px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container11 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[17px] not-italic text-[#94a3b8] text-[12px] text-center top-[5px] whitespace-nowrap">12</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources29() {
  return (
    <div className="h-[24px] relative shrink-0 w-[63.164px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text5 />
        <Icon17 />
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white h-[78px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21px] py-px relative size-full">
          <SelfCareResources28 />
          <SelfCareResources29 />
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38772900} id="Vector_2" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p27fa8ca0} id="Vector_3" stroke="var(--stroke-0, #4F95FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#ebf4ff] relative rounded-[16px] shrink-0 size-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[28.5px] not-italic text-[#1e293b] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Posters</p>
      </div>
    </div>
  );
}

function SelfCareResources30() {
  return (
    <div className="h-[44px] relative shrink-0 w-[116.188px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container12 />
        <Text6 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#f1f5f9] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[14px] not-italic text-[#94a3b8] text-[12px] text-center top-[5px] whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, #CBD5E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SelfCareResources31() {
  return (
    <div className="h-[24px] relative shrink-0 w-[57.891px]" data-name="SelfCareResources">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Text7 />
        <Icon19 />
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white h-[78px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21px] py-px relative size-full">
          <SelfCareResources30 />
          <SelfCareResources31 />
        </div>
      </div>
    </div>
  );
}

function SelfCareResources23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[348px] items-start relative shrink-0 w-full" data-name="SelfCareResources">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-0 top-[654px] w-[767px]" data-name="Container">
      <SelfCareResources22 />
      <SelfCareResources23 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-[1046px] relative shrink-0 w-[767px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Container4 />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[815_0_0] h-[1142px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[24px] pt-[32px] relative size-full">
        <MainContent />
      </div>
    </div>
  );
}

function SelfCareResources() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex h-[1142px] items-start left-0 pl-[256px] top-0 w-[1071px]" data-name="SelfCareResources">
      <Container />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3 9H15" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 4.5H15" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 13.5H15" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function MantraLogoSvg() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="MantraLogoSVG">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[4.73%_67.87%_11.57%_16.04%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.747 20.0878">
            <path d={svgPaths.p112fc200} fill="var(--fill-0, #00C0FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[39.58%_70.42%_1.06%_19.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5243 14.2453">
            <path d={svgPaths.p1cf46800} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.72%_72.5%_40.36%_25.11%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.82094 3.82094">
            <path d={svgPaths.ped21400} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[12.39%_54.66%_12.3%_33.9%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2987 18.075">
            <path d={svgPaths.pa35f700} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[30.69%_45.5%_11.21%_47.18%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7074 13.9425">
            <path d={svgPaths.p16e5c700} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[30.69%_36.77%_12.3%_56.17%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.285 13.6812">
            <path d={svgPaths.p3144b780} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[18.13%_30.78%_11.21%_64.45%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.62353 16.9588">
            <path d={svgPaths.p611dff0} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[30.69%_24.98%_12.3%_70.61%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.0512 13.6812">
            <path d={svgPaths.p2088ba40} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[30.69%_16.84%_11.21%_75.84%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.708 13.9425">
            <path d={svgPaths.p6764b40} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[160px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <MantraLogoSvg />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-[60px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-px pl-[12px] relative size-full">
        <Button14 />
        <Container14 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.992px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[19.5px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function NavItem() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon21 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35.5px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Care Team</p>
      </div>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon22 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[92.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[46.5px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Appointments</p>
      </div>
    </div>
  );
}

function NavItem2() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon23 />
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14eb5b80} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3fe63d80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[19.5px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Tasks</p>
      </div>
    </div>
  );
}

function NavItem3() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon24 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[26px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Insights</p>
      </div>
    </div>
  );
}

function NavItem4() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon25 />
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cf7de80} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ebe9ac0} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.5833V5.41667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[20px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Billing</p>
      </div>
    </div>
  );
}

function NavItem5() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon26 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p16dd5f0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 8.33333H18.3333" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[132.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[66px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Plans (Only Testing)</p>
      </div>
    </div>
  );
}

function NavItem6() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon27 />
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[292px] items-start left-[8px] top-[8px] w-[239px]" data-name="Container">
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
      <NavItem4 />
      <NavItem5 />
      <NavItem6 />
    </div>
  );
}

function Container16() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[312px] w-[223px]" data-name="Container" />;
}

function Container17() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[377px] w-[223px]" data-name="Container" />;
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pdf995c0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 15H12.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 18.3333H11.6667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[96.5px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Share Feedback (Wordpress)</p>
      </div>
    </div>
  );
}

function NavItem7() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <Icon28 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2015_612)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2015_612">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[53.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[27px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Support</p>
      </div>
    </div>
  );
}

function NavItem8() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon29 />
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[82px] items-start left-[8px] top-[390px] w-[239px]" data-name="Container">
      <NavItem7 />
      <NavItem8 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pc4ad940} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V17.5" id="Vector_2" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p24a96bc0} id="Vector_3" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c64b180} id="Vector_4" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[92.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[46.5px] not-italic text-[#059669] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Invite a Friend</p>
      </div>
    </div>
  );
}

function NavItem9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[8px] pl-[12px] rounded-[16px] top-[325px] w-[239px]" data-name="NavItem">
      <Icon30 />
      <Text17 />
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="flex-[520_0_0] min-h-px min-w-px relative w-[255px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container15 />
        <Container16 />
        <Container17 />
        <Container18 />
        <NavItem9 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#2d9cdb] relative rounded-[16777200px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px] whitespace-nowrap">D</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[37px] not-italic text-[#64748b] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Demo User</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Container19 />
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Sidebar2() {
  return (
    <div className="h-[65px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9px] px-[8px] relative size-full">
        <Button15 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white h-[645px] left-0 top-0 w-[256px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-px relative rounded-[inherit] size-full">
        <Sidebar />
        <Sidebar1 />
        <Sidebar2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function MantraCareServicesDashboardAditya() {
  return (
    <div className="bg-[#f6f8fb] relative size-full" data-name="MantraCare services dashboard (Aditya)">
      <SelfCareResources />
      <Container13 />
    </div>
  );
}
