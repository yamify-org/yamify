import React, { RefObject } from "react";
import "@/styles/WhatIfSection.css";
import Image from "next/image";
import ActionCard from "./ActionCard";

type Props = {
  workIfRef: RefObject<HTMLDivElement | null>;
  lightMode: boolean;
};

const WhatIfSection = ({ workIfRef, lightMode }: Props) => {
  return (
    <section
      className={`what-if-section ${lightMode && "light-mode"}`}
      ref={workIfRef}
    >
      <div className={`content `}>
        <Image
          src="/svgs/top_left_corner_pin.svg"
          className="pin top-left"
          alt=""
          width={21}
          height={21}
        />
        <Image
          src="/svgs/top_right_corner_pin.svg"
          className="pin top-right"
          alt=""
          width={21}
          height={21}
        />
        <h2>
          What if everything you needed to build lived in your hands? <br />{" "}
          What if launching your app didn’t mean juggling platforms that don’t
          understand your reality? <br /> What if scaling didn’t drain your
          budget—or your energy?
          <br /> What if the tools around you spoke your language, knew your
          currency, and matched your rhythm? <br />
          What if you could stop hacking around limitations—and just build?
        </h2>

        <p>
          At Yamify, we’re building what others overlook: <br /> A cloud that’s
          reliable, affordable, and made just for you.
        </p>
      </div>
      {/* <div className="action-card"></div> */}
      <ActionCard
        lightMode={lightMode}
        tagContents={["Set it.", "Spin it.", "Scale it."]}
      />
    </section>
  );
};

export default WhatIfSection;
