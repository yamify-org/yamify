import React from "react";
import "@/styles/HeroSection.css";
import Image from "next/image";

const HeroSection = () => {
  const classMap = {
    highlight: [
      2, 3, 5, 6, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 27, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 53,
      54, 55, 56, 57, 58, 64, 65, 66, 67, 74, 75, 76, 77, 84, 85, 86, 87, 95,
      96, 99, 105, 108, 109,
    ],
    // glitch: [9, 41, 75],
    // gold: [54, 70, 109],
  };

  return (
    <div className="hero-section">
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
          <h1>Tell us what you want to build. We’ll handle the rest.</h1>
          <p>
            Launch your application, website, or platform with infrastructure
            that configures itself. Whether you’re a solo developer, startup
            founder, or team, our AI-powered cloud platform sets up the right
            environment, connects your code, and scales as you grow.
          </p>
          <div className="btn">
            <div className="contain">
              <span>Join WaitList</span>
              <span className="hover-text">Join WaitList</span>
            </div>
          </div>
        </div>

        <div className="right-content">
          {[...Array(110)].map((_, i) => {
            let boxClass = "grid-box";

            Object.entries(classMap).forEach(([key, indexes]) => {
              if (indexes.includes(i)) boxClass += ` ${key}`;
            });

            return <div key={i} className={boxClass}></div>;
          })}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
