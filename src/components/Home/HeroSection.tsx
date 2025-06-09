import React, { RefObject, useEffect, useRef, useState } from "react";
import "@/styles/HeroSection.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import routes from "@/libs/routes";

type Props = {
  heroRef: RefObject<HTMLDivElement | null>;
  lightMode: boolean;
};

type Timeout = ReturnType<typeof setTimeout>;

const HeroSection = ({ heroRef, lightMode }: Props) => {
  const classMap = {
    highlight: [
      2, 3, 5, 6, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 27, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 53,
      54, 55, 56, 57, 58, 64, 65, 66, 67, 74, 75, 76, 77, 84, 85, 86, 87, 95,
      96, 99, 105, 108,
    ],
    active: [23, 25, 26, 33, 35, 36, 43, 44, 45, 46, 55, 56, 64, 65],
  };

  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const timeoutRefs = useRef<Timeout[]>([]);
  const rhythmRef = useRef<number>(0); // Track rhythm position

  // Clear all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    // Available highlights excluding active boxes
    const availableHighlights = classMap.highlight.filter(
      (idx) => !classMap.active.includes(idx)
    );

    // Different animation patterns
    const patterns = [
      // Pattern 1: Quick successive bursts
      () => {
        const count = 2 + Math.floor(Math.random() * 3);
        const group = [];
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * availableHighlights.length);
          group.push(availableHighlights[idx]);
        }
        // animateGroup(group, 300, 100);
        animateGroup(group, 300);
        return 600 + Math.random() * 400;
      },

      // Pattern 2: Slow wave
      () => {
        const waveSize = 4 + Math.floor(Math.random() * 3);
        const wave: number[][] = [];
        for (let i = 0; i < waveSize; i++) {
          const idx = Math.floor(Math.random() * availableHighlights.length);
          wave.push([availableHighlights[idx]]);
        }
        animateWave(wave, 150, 200);
        return 1200 + Math.random() * 600;
      },

      // Pattern 3: Random clusters
      () => {
        const clusterCount = 1 + Math.floor(Math.random() * 2);
        for (let c = 0; c < clusterCount; c++) {
          const clusterSize = 2 + Math.floor(Math.random() * 3);
          const cluster = [];
          for (let i = 0; i < clusterSize; i++) {
            const idx = Math.floor(Math.random() * availableHighlights.length);
            cluster.push(availableHighlights[idx]);
          }
          // animateGroup(cluster, 400, 50 + Math.random() * 100);
          animateGroup(cluster, 400);
        }
        return 800 + Math.random() * 400;
      },
    ];

    // Animate a group of highlights
    const animateGroup = (
      indices: number[],
      duration: number
      // delay: number = 0
    ) => {
      setActiveIndices((prev) => [...prev, ...indices]);

      timeoutRefs.current.push(
        setTimeout(() => {
          setActiveIndices((prev) =>
            prev.filter((idx) => !indices.includes(idx))
          );
        }, duration)
      );
    };

    // Animate a wave pattern
    const animateWave = (
      waveGroups: number[][],
      duration: number,
      delay: number
    ) => {
      waveGroups.forEach((group, i) => {
        timeoutRefs.current.push(
          setTimeout(() => {
            animateGroup(group, duration);
          }, i * delay)
        );
      });
    };

    // Main rhythm driver
    const driveRhythm = () => {
      rhythmRef.current = (rhythmRef.current + 1) % patterns.length;
      const nextDelay = patterns[rhythmRef.current]();

      timeoutRefs.current.push(setTimeout(driveRhythm, nextDelay));
    };

    // Start with initial delay
    timeoutRefs.current.push(setTimeout(driveRhythm, 1000));

    // Occasionally highlight active boxes with special effect
    const highlightActive = () => {
      const activeGroup = [...classMap.active];
      const duration = 600;

      // Special "glow" effect for active boxes
      setActiveIndices((prev) => [...prev, ...activeGroup]);

      timeoutRefs.current.push(
        setTimeout(() => {
          setActiveIndices((prev) =>
            prev.filter((idx) => !activeGroup.includes(idx))
          );
        }, duration)
      );

      return 5000 + Math.random() * 3000;
    };

    // Start active box highlighter
    const startActiveHighlighter = () => {
      const delay = highlightActive();
      timeoutRefs.current.push(setTimeout(startActiveHighlighter, delay));
    };

    startActiveHighlighter();
  }, []);

  return (
    <div className={`hero-section ${lightMode && "light-mode"}`} ref={heroRef}>
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
          <Link href={routes.auth.signup} className="btn">
            <div className="contain">
              <span>Get Started for Free</span>
              <span className="hover-text">Get Started for Free</span>
            </div>
          </Link>
        </div>

        <div className="right-content">
          {[...Array(110)].map((_, i) => {
            let boxClass = "grid-box";
            const isHighlight = classMap.highlight.includes(i);
            const isActive = classMap.active.includes(i);

            if (isHighlight) boxClass += " highlight";
            if (isActive) boxClass += " active";

            const isAnimating = activeIndices.includes(i);

            return (
              <div key={i} className={boxClass}>
                {isHighlight && (
                  <>
                    <motion.div
                      className="highlight-bg left"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isAnimating ? 1 : 0,
                        opacity: isAnimating ? (isActive ? 0.8 : 0.6) : 0,
                      }}
                      transition={{
                        scaleX: {
                          duration: 0.4,
                          ease: [0.16, 0.3, 0.3, 1.2], // Bouncy ease
                        },
                        opacity: { duration: 0.3 },
                      }}
                    />
                    <motion.div
                      className="highlight-bg right"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isAnimating ? 1 : 0,
                        opacity: isAnimating ? (isActive ? 0.8 : 0.6) : 0,
                      }}
                      transition={{
                        scaleX: {
                          duration: 0.4,
                          ease: [0.16, 0.3, 0.3, 1.2],
                          delay: 0.05,
                        },
                        opacity: { duration: 0.3, delay: 0.05 },
                      }}
                    />
                  </>
                )}
                {i === 23 && (
                  <Image
                    src="/svgs/laravel_icon.svg"
                    className="icon-img"
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
                    className="icon-img"
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
                    className="icon-img"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 35 && (
                  <Image
                    src="/svgs/ai_bionic.svg"
                    className="icon-img"
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
                    className="icon-img"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 44 && (
                  <Image
                    src="/svgs/code-square-svg.svg"
                    className="icon-img"
                    alt=""
                    width={30}
                    height={30}
                  />
                )}
                {i === 45 && (
                  <Image
                    src="/svgs/java_svg.svg"
                    className="icon-img"
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
                    className="icon-img"
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
