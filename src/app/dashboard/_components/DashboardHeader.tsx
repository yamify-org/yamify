import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "@/styles/DashboardHeader.css";
import CircularProgress from "./CircularProgress";
import Link from "next/link";
import routes from "@/libs/routes";
import { motion, AnimatePresence } from "framer-motion";

const dropDownVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.2 } },
};

const DashboardHeader = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowProfileModal(false);
      }
    };

    if (showProfileModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileModal]);

  const handleLogout = () => {};

  return (
    <div className="header">
      <div className="wrap">
        <div className="notification">
          <Image src="/svgs/notification.svg" alt="" width={15} height={15} />
        </div>
        <div className="profile-contain" ref={dropdownRef}>
          <div
            className="profile-wrap"
            onClick={() => setShowProfileModal(!showProfileModal)}
          >
            <Image
              src="/images/profile.jpg"
              alt=""
              width={768}
              height={552}
              className="profile-img"
            />
            <p>Marcus Otunba</p>
            <Image src="/svgs/caret_down.svg" alt="" width={15} height={15} />
          </div>

          <AnimatePresence>
            {showProfileModal && (
              <motion.div
                className="profile-modal"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropDownVariants}
                style={{ originY: 0 }} // Makes it drop from top edge
              >
                <div className="left">
                  <h2>Your Developer Journey</h2>

                  <p>
                    You&apos;re currently on the <span>Learner</span> track.
                    Yamify grows with you—from first deploy to production-ready
                    apps. As you build, deploy, and explore new tools, your
                    account evolves. <br /> <br /> Every Yamlet launched, every
                    environment created brings you closer to becoming an{" "}
                    <span>Expert</span>.
                  </p>

                  <div className="count">
                    <div className="txt">
                      Keep going—your cloud mastery is loading.
                    </div>

                    <CircularProgress percentage={100} />
                  </div>
                </div>

                <div className="right">
                  <div className="content">
                    <Image
                      src="/images/profile.jpg"
                      alt=""
                      width={768}
                      height={552}
                    />
                    <h2>Marcus Otunba</h2>
                    <p>Marcusotunba@gmail.com</p>
                  </div>

                  <div className="actions">
                    <Link href={routes.dashboard.overview} className="action">
                      <div className="wrap">
                        <Image
                          src="/svgs/user.svg"
                          alt=""
                          width={15}
                          height={15}
                        />
                        <p>Profile Settings</p>
                      </div>

                      <Image
                        alt=""
                        src="/svgs/caret_right.svg"
                        height={15}
                        width={15}
                      />
                    </Link>
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="action"
                    >
                      <div className="wrap">
                        <Image
                          src="/svgs/moon.svg"
                          alt=""
                          width={15}
                          height={15}
                        />
                        <p>Theme</p>
                      </div>

                      <Image
                        alt=""
                        src="/svgs/caret_right.svg"
                        height={15}
                        width={15}
                      />
                    </Link>

                    <div className="logout-container">
                      <div className="logout-action" onClick={handleLogout}>
                        <p>Log out</p>

                        <Image
                          src="/svgs/logout.svg"
                          alt=""
                          width={15}
                          height={15}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
