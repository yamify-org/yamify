"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "@/styles/ActionCard.css";

type Props = {
  tagContents: Array<string>;
  rmBorder?: boolean;
};

const ActionCard = ({ tagContents, rmBorder }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tagContents.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [tagContents.length]);

  return (
    <div className={`action-card ${rmBorder && "rm-border"}`}>
      <div className="contain">
        {tagContents.map((content, index) => (
          <motion.h3
            key={index}
            initial={false}
            animate={{
              opacity:
                activeIndex === index
                  ? 1
                  : index === (activeIndex + 1) % tagContents.length
                  ? 0.5
                  : 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {content}
          </motion.h3>
        ))}
      </div>
    </div>
  );
};

export default ActionCard;
