import React, { useEffect, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/CreateAnimation.css";
import { useRouter } from "next/navigation";

type Props = {
  successBool: boolean;
  barColor?: string;
  title: string;
  loadingTxts: string[];
};

const CreateAnimation = ({
  successBool,
  barColor = "#dd9a38",
  loadingTxts,
  title,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (successBool) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next < loadingTxts.length) {
            setBarWidth((next / loadingTxts.length) * 100);
            return next;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 2500);

      const redirectTimeout = setTimeout(() => {
        router.push("/dashboard");
      }, 12000);

      return () => {
        clearInterval(interval);
        clearTimeout(redirectTimeout);
      };
    }
  }, [successBool, loadingTxts.length, router]);

  return (
    <div className="success-container">
      <LoadingAnimation />
      <p>{title}</p>

      <div className="loading-details">
        <div className="loading-bar">
          <motion.div
            className="moving-bar"
            animate={{ width: `${barWidth * 2}px` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ backgroundColor: barColor }}
          />
        </div>

        <div className="txt">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingTxts[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateAnimation;
