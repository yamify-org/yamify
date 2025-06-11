import { motion } from "framer-motion";

const LineRain = () => {
  // const rows = 8;
  const cols = 7;
  const total = 53; // 7 full rows + 4 lines on the last row

  const lines = Array.from({ length: total });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "7px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {lines.map((_, i) => {
        const randomDelay = Math.random() * 3;

        return (
          <motion.svg
            key={i}
            width="16" // smaller width
            height="16" // smaller height
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ stroke: "#202020", opacity: 0.2 }}
            animate={{ stroke: "#A8711D", opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 0.6,
              delay: randomDelay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <line x1="1" y1="1" x2="15" y2="15" strokeWidth="2" />
          </motion.svg>
        );
      })}
    </div>
  );
};

export default LineRain;
