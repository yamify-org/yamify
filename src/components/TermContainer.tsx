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

const useActiveIndex = (length: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return { activeIndex, refs };
};

const TermsScroll = () => {
  const { activeIndex, refs } = useActiveIndex(terms.length);

  return (
    <div className="terms-container-mb">
      <div className="left">
        {terms.map((term, index) => (
          <motion.div
            key={index}
            className={`term-card`}
            layout
            animate={{
              backgroundColor: activeIndex === index ? "#4c4c4c" : "#232323",
              color: activeIndex === index ? "#fff" : "#ccc",
              scale: activeIndex === index ? 1.05 : 1,
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
