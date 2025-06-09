"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/YamLayersSection.css";
import ActionCard from "./ActionCard";
import TermsScroll from "./TermContainer";
// import AnimatedTerms from "./TermContainer";

type Props = {
  yamLayerRef: RefObject<HTMLDivElement | null>;
  lightMode: boolean;
};

const YamLayersSection = ({ yamLayerRef, lightMode }: Props) => {
  const [indexNumber, setIndexNumber] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    // Run the function once to set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const classMap = {
    highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  };

  const terms = [
    {
      name: "YamRoot",
      description:
        "Your AI-powered virtual datacenter, ready to deploy. Spin up infrastructure in seconds with intelligent defaults and auto-optimization—no ops team required.",
    },
    {
      name: "YamLets",
      description:
        "Modular, ready-to-launch solutions for common local needs. Skip the boilerplate. From mobile money auth to local API connectors, Yamlets handle the heavy lifting so you don’t have to.",
    },
    {
      name: "Germinate",
      description:
        "One-click deploy flow: staging or production. Go live faster. Germinate gives you seamless, AI-assisted deployments—zero config, zero drama.",
    },
    {
      name: "Farmland",
      description:
        "our workspace, with the tools and templates you need. A cloud studio that grows with you—CI/CD pipelines, starter kits, AI helpers, and more, all in one place.",
    },
    {
      name: "SeedCycle",
      description:
        "End-to-end release pipeline: from idea → production. Turn features into finished products. Seedcycle manages your rollouts, updates, and environments with smart automation.",
    },
  ];

  const cycleTerms = () => {
    setIndexNumber((prev) => (prev + 1) % terms.length);
  };

  const restartInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(cycleTerms, 5000);
  };

  useEffect(() => {
    restartInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (index: number) => {
    setIndexNumber(index);
    restartInterval();
  };

  const handleMouseEnter = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIndexNumber(index); // <--- update immediately
  };

  const handleMouseLeave = () => {
    restartInterval();
  };

  return (
    <section
      className={`yam-layers-section ${lightMode && "light-mode"}`}
      ref={yamLayerRef}
    >
      <div className="first-container">
        <div className="content">
          <h1>Yam Layers</h1>
          <p>
            Every Yamlet starts with a story—your story. We work closely with
            developers in Africa to uncover real friction points, then turn
            those patterns into modular tools that anyone can launch in seconds.
          </p>
        </div>

        <div className="terms-container">
          <div className="main-term">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`h2-${indexNumber}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {terms[indexNumber].name}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`p-${indexNumber}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
              >
                {terms[indexNumber].description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="term-cards">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                className={`term-card ${indexNumber === index ? "active" : ""}`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)} // <-- important
                onMouseLeave={handleMouseLeave} // <-- important
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>{term.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <TermsScroll />
      <div className="second-container">
        <div className="wrap">
          <div className="boxes-container">
            {[...Array(9)].map((_, i) => {
              let boxClass = "grid-box";

              Object.entries(classMap).forEach(([key, indexes]) => {
                if (indexes.includes(i)) boxClass += ` ${key}`;
              });

              return <div key={i} className={boxClass}></div>;
            })}
          </div>
          <div className="boxes-container">
            {[...Array(9)].map((_, i) => {
              let boxClass = "grid-box";

              Object.entries(classMap).forEach(([key, indexes]) => {
                if (indexes.includes(i)) boxClass += ` ${key}`;
              });

              return <div key={i} className={boxClass}></div>;
            })}
          </div>
        </div>

        <div className="features-container">
          {isMobile && (
            <div className="middle">
              <h3>Bonus Features</h3>
              <p>
                At Yamify, every feature starts with a conversation. We’re
                listening to African developers every day—through feedback,
                interviews, and waitlist responses—to uncover real patterns, and
                build Yamlets that solve real problems.
              </p>
            </div>
          )}
          <div className="left">
            <div className="card">Pay-as-you-go pricing</div>
            <div className="card">Built-in compliance tooling</div>
            <div className="card">
              Real-time insights into regional cloud performance
            </div>
            <div className="card">Feedback loop: you tell us, we build it</div>
          </div>
          {!isMobile && (
            <div className="middle">
              <h3>Bonus Features</h3>
              <p>
                At Yamify, every feature starts with a conversation. We’re
                listening to African developers every day—through feedback,
                interviews, and waitlist responses—to uncover real patterns, and
                build Yamlets that solve real problems.
              </p>
            </div>
          )}
          <div className="right">
            <div className="card">Mobile money & country-based billing</div>
            <div className="card">
              AI setup enhancer (recommends and automates best deployment
              config)
            </div>
            <div className="card">
              AI support chatbot for real-time infra help
            </div>
          </div>
        </div>
      </div>
      <ActionCard
        lightMode={lightMode}
        rmBorder={true}
        tagContents={["We get you.", "You’re not alone."]}
      />
    </section>
  );
};

export default YamLayersSection;
