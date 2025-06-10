"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "@/styles/WhatIsYamifySection.css";

const WhatIsYamifySection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const words =
    `Yamify is an AI-powered cloud infrastructure platform that lets developers deploy and manage apps inside lightweight, isolated Kubernetes environments called Yams. It simplifies complex DevOps tasks with preconfigured clusters, one-click app installs, and smart AI deployment assistants. Built for accessibility, Yamify supports local billing, mobile money, and developer tools tailored for growing teams. Whether you’re deploying a static site or an AI-powered service, Yamify grows with you.`.split(
      " "
    );

  return (
    <div className="what-is-yamify-section" ref={sectionRef}>
      <section>
        <div className="container">
          <p className="animated-paragraph">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;

              const scaleX = useTransform(
                scrollYProgress,
                [start, end],
                [0, 1]
              );

              return (
                <span key={i} className="word">
                  <span className="word-mask">
                    <motion.span style={{ scaleX }} className="word-reveal">
                      {word}&nbsp;
                    </motion.span>
                  </span>
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhatIsYamifySection;
