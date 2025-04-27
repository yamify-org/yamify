import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "@/styles/LoadingAnimation.css";

const TOTAL_BOXES = 20;

// Default layout
const defaultClassMap = {
  highlight: [0, 3, 4, 7, 9, 10, 11, 15, 17, 18],
  grey: [2, 6, 14],
  thicker: [1, 5, 8, 13, 16],
  lightOrange: [10, 18],
};

const generateRandomIndexes = (count: number, exclude: number[] = []) => {
  const indexes = new Set<number>();
  while (indexes.size < count) {
    const randomIndex = Math.floor(Math.random() * TOTAL_BOXES);
    if (!exclude.includes(randomIndex)) {
      indexes.add(randomIndex);
    }
  }
  return Array.from(indexes);
};

export default function LoadingAnimation() {
  const [classMap, setClassMap] = useState(defaultClassMap);

  useEffect(() => {
    let switchCount = 0;

    const interval = setInterval(() => {
      switchCount += 1;

      if (switchCount >= 4) {
        setClassMap(defaultClassMap);
        switchCount = 0;
      } else {
        setClassMap({
          highlight: generateRandomIndexes(10),
          grey: generateRandomIndexes(3),
          thicker: generateRandomIndexes(5),
          lightOrange: generateRandomIndexes(2),
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="boxes logo">
      {[...Array(TOTAL_BOXES)].map((_, i) => {
        let boxClass = "grid-box";

        Object.entries(classMap).forEach(([key, indexes]) => {
          if (indexes.includes(i)) {
            boxClass += ` ${key}`;
          }
        });

        return (
          <motion.div
            key={i}
            className={boxClass}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
