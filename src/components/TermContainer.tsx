import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
      "Your workspace, with the tools and templates you need. A cloud studio that grows with you—CI/CD pipelines, starter kits, AI helpers, and more, all in one place.",
  },
  {
    name: "SeedCycle",
    description:
      "End-to-end release pipeline: from idea → production. Turn features into finished products. Seedcycle manages your rollouts, updates, and environments with smart automation.",
  },
];

const useActiveIndex = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPositions = refs.current.map((ref) => {
        if (!ref) return Number.POSITIVE_INFINITY;
        return Math.abs(ref.getBoundingClientRect().top);
      });

      const minPosition = Math.min(...scrollPositions);
      const indexClosestToTop = scrollPositions.indexOf(minPosition);

      if (indexClosestToTop !== activeIndex) {
        setActiveIndex(indexClosestToTop);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return { activeIndex, refs };
};

const TermsScroll = () => {
  const { activeIndex, refs } = useActiveIndex();

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

  return (
    <div className="terms-container-mb">
      <div className="left">
        {terms.map((term, index) => (
          <motion.div
            key={index}
            className={`term-card`}
            layout
            animate={{
              backgroundColor:
                activeIndex === index
                  ? "#3B5F5D4D"
                  : !isMobile
                  ? "#232323"
                  : "#1b1b1b05",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3>{term.name}</h3>
          </motion.div>
        ))}
      </div>

      <div className="right">
        {terms.map((term, index) => (
          <div
            key={index}
            className="term-card"
            data-index={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
          >
            <h2>{term.name}</h2>
            <p>{term.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsScroll;
