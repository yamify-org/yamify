import React, { useEffect, useState } from "react";
import "@/styles/CreateYamDialog.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import LoadingAnimation from "@/components/LoadingAnimation";

type Props = {
  setShowYamDialog: (Callback: boolean) => void;
};

const CreateYamDialog = ({ setShowYamDialog }: Props) => {
  const [selected, setSelected] = useState("Select workspace");
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState<string | null>(null);
  const [successBool, setSuccessBool] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

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

      return () => clearInterval(interval);
    }
  }, [successBool]);

  const togglePrivacy = (service: string) => {
    setPrivacy((prev) => (prev === service ? null : service));
  };

  const loadingTxts = [
    "Creating your cluster with optimized defaults…",
    "Auto-scaling and security being configured in the backgrpimd.",
    "We’re applying AI-powered enhancements for smooth performance.",
    "You’ll be ready to build in just a moment.",
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessBool(true);
  };

  return (
    <div className="create-yam-dialog">
      <div className="background-opacity"></div>
      <div className="dialog-contain">
        <div className="close-btn" onClick={() => setShowYamDialog(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
          >
            <path
              d="M11.75 3.75L4.25 11.25M4.25 3.75L11.75 11.25"
              stroke="#E6E6E6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="yam-dialog-container">
          <form onSubmit={onSubmit}>
            <div className="head">
              <h1>Create a Yam</h1>
            </div>

            {!successBool ? (
              <>
                <p>
                  Names must be in lowercase. They can between 3 and 45
                  characters long and may contain dashes.
                </p>

                <div className="form">
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Workspace</label>
                    </div>
                    <div className="right">
                      <div className="workspace-select">
                        <div
                          className="selected"
                          onClick={() => setOpen(!open)}
                        >
                          {selected}
                          <span className="arrow">
                            <Image
                              src="/svgs/caret_down.svg"
                              alt=""
                              width={15}
                              height={15}
                            />
                          </span>
                        </div>

                        {open && (
                          <ul className="options">
                            {["Marcus's Workspace"].map((opt) => (
                              <li
                                key={opt}
                                onClick={() => {
                                  setSelected(opt);
                                  setOpen(false);
                                }}
                              >
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Name</label>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="yamName"
                        placeholder="Enter yam’s name"
                        required
                      />
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Privacy</label>
                    </div>
                    <div className="right checkbox-right">
                      <div className="checkbox-container">
                        {["Private to me", "Share with team"].map(
                          (option, index) => (
                            <div
                              key={index}
                              className={`box  ${
                                privacy === option && "active"
                              }`}
                              onClick={() => togglePrivacy(option)}
                            >
                              <div className="containn">
                                <span> {option}</span>
                                <span className="hover-text"> {option}</span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="default-container">
                  <h3>default specs</h3>

                  <div className="default-contain">
                    <div className="default-row">
                      <h2>k3s version</h2>
                      <p>v1.20.0 + k3s1</p>
                    </div>
                    <div className="default-row">
                      <h2>Type</h2>
                      <p>K3s</p>
                    </div>
                    <div className="default-row">
                      <h2>Network</h2>
                      <p>Network</p>
                    </div>
                  </div>
                </div>

                <button type="submit">Create</button>
              </>
            ) : (
              <div className="success-container">
                <LoadingAnimation />
                <p>
                  Your cloud environment is sprouting—built to scale, secure by
                  default, and made just for you.
                </p>

                <div className="loading-details">
                  <div className="loading-bar">
                    <motion.div
                      className="moving-bar"
                      animate={{ width: `${barWidth * 2}px` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
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
            )}
          </form>

          <div className="sample-container"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateYamDialog;
