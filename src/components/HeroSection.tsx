import React, { RefObject } from "react";
import "@/styles/HeroSection.css";
import Image from "next/image";

type Props = {
  heroRef: RefObject<HTMLDivElement | null>;
};

const HeroSection = ({ heroRef }: Props) => {
  const classMap = {
    highlight: [
      2, 3, 5, 6, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 27, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 53,
      54, 55, 56, 57, 58, 64, 65, 66, 67, 74, 75, 76, 77, 84, 85, 86, 87, 95,
      96, 99, 105, 108, 109,
    ],
    active: [23, 25, 26, 33, 35, 36, 43, 44, 45, 46, 55, 56, 64, 65],
  };

  return (
    <div className="hero-section" ref={heroRef}>
      <section>
        <Image
          src="/svgs/top_right_pin.svg"
          alt=""
          className="pin top-right"
          width={21}
          height={11}
        />
        <Image
          src="/svgs/top_right_pin.svg"
          alt=""
          className="pin top-left"
          width={21}
          height={11}
        />
        <div className="left-content">
          <h1>Reliable, Affordable Cloud.</h1>
          <p>
            Yamify is your personal cloud—AI-powered, preconfigured, and ready
            to scale with you. Built for reliability and affordability, it gives
            African developers the tools and support they need to launch, grow,
            and thrive.
          </p>
          <div className="btn">
            <div className="contain">
              <span>Join the WaitList</span>
              <span className="hover-text">Join the WaitList</span>
            </div>
          </div>
        </div>

        <div className="right-content">
          {[...Array(110)].map((_, i) => {
            let boxClass = "grid-box";

            Object.entries(classMap).forEach(([key, indexes]) => {
              if (indexes.includes(i)) boxClass += ` ${key}`;
            });

            return (
              <div key={i} className={boxClass}>
                {i === 23 && (
                  <Image
                    src="/svgs/laravel_icon.svg"
                    alt=""
                    width={29.091}
                    height={29.948}
                  />
                )}
                {i === 25 && (
                  <Image
                    src="/svgs/sql-svg.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 26 && (
                  <Image
                    src="/images/img_1.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
                {i === 33 && (
                  <Image
                    src="/svgs/nextjs-svg.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 35 && (
                  <Image
                    src="/svgs/ai_bionic.svg"
                    alt=""
                    width={22.5}
                    height={22.5}
                  />
                )}
                {i === 36 && (
                  <Image
                    src="/images/African Kente.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
                {i === 43 && (
                  <Image
                    src="/svgs/javascript-svg.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 44 && (
                  <Image
                    src="/svgs/code-square-svg.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 45 && (
                  <Image
                    src="/svgs/java_svg.svg"
                    alt=""
                    width={22.116}
                    height={29.941}
                  />
                )}
                {i === 46 && (
                  <Image
                    src="/images/img_3.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}

                {i === 55 && (
                  <Image
                    src="/svgs/node-16-svg.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 56 && (
                  <Image
                    src="/images/Drapeau Congo.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}

                {i === 64 && (
                  <Image
                    src="/images/img_4.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
                {i === 65 && (
                  <Image
                    src="/images/img_5.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
