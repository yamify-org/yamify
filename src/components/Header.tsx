"use client";

import Image from "next/image";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";
// import { motion } from "framer-motion";
import "@/styles/Header.css";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  heroRef: RefObject<HTMLDivElement | null>;
  workIfRef: RefObject<HTMLDivElement | null>;
  capabilityRef: RefObject<HTMLDivElement | null>;
  yamLayerRef: RefObject<HTMLDivElement | null>;
  joinWaitlistRef: RefObject<HTMLDivElement | null>;
};

const Header = ({
  setJoinWaitlistModal,
  heroRef,
  workIfRef,
  capabilityRef,
  yamLayerRef,
  joinWaitlistRef,
}: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(heroRef);
  };

  const handleScrollToWorkIf = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(workIfRef);
  };

  const handleScrollToCapability = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(capabilityRef);
  };

  const handleScrollToYamLayer = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(yamLayerRef);
  };

  const handleScrollToJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(joinWaitlistRef);
  };

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // Delay to ensure DOM is ready after navigation
  };

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
      <section>
        <Link href="/" className="logo">
          <div className="menu">
            {openMenu ? (
              <Image
                src="/svgs/close.svg"
                alt=""
                width={20}
                height={20}
                onClick={() => setOpenMenu(false)}
              />
            ) : (
              <Image
                src="/svgs/menu.svg"
                alt=""
                width={20}
                height={20}
                onClick={() => setOpenMenu(true)}
              />
            )}
          </div>

          <Image
            src="/svgs/yamify_logo_sm.svg"
            alt="Yamify Logo"
            className="logo-img"
            width={20}
            height={25.333}
          />
          <h1>Yamify</h1>
        </Link>

        <nav>
          <div className="nav-link" onClick={handleScrollToWork}>
            <span>Home</span>
            <span className="hover-text">Home</span>
          </div>
          <div className="nav-link" onClick={handleScrollToWorkIf}>
            <span>What if</span>
            <span className="hover-text">What if</span>
          </div>
          <div className="nav-link" onClick={handleScrollToCapability}>
            <span>Capabilities</span>
            <span className="hover-text">Capabilities</span>
          </div>
          <div className="nav-link" onClick={handleScrollToYamLayer}>
            <span>Yamify Layers</span>
            <span className="hover-text">Yamify Layers</span>
          </div>
          <div className="nav-link" onClick={handleScrollToJoinWaitlist}>
            <span>For Developers</span>
            <span className="hover-text">For Developers</span>
          </div>
        </nav>

        <div className="action-btns">
          <div className="modes">
            <div className="btn-mode light">
              <Image src="/svgs/sun.svg" alt="" width={15} height={15} />
            </div>
            <div className="btn-mode dark">
              <Image src="/svgs/moon.svg" alt="" width={15} height={15} />
            </div>
          </div>

          <div
            className="btn yellow"
            onClick={() => setJoinWaitlistModal(true)}
          >
            <div className="contain">
              <span>Join WaitList</span>
              <span className="hover-text">Join WaitList</span>
            </div>
          </div>

          <div className="btn green">
            <div className="contain">
              <span>Contact</span>
              <span className="hover-text">Contact</span>
            </div>
          </div>
        </div>

        {openMenu && (
          <div className="menu-mobile-container">
            <div className="nav-link" onClick={handleScrollToWork}>
              Home
            </div>
            <div className="nav-link" onClick={handleScrollToWorkIf}>
              What if
            </div>
            <div className="nav-link" onClick={handleScrollToCapability}>
              Capabilities
            </div>
            <div className="nav-link" onClick={handleScrollToYamLayer}>
              Yamify Layers
            </div>
            <div className="nav-link" onClick={handleScrollToJoinWaitlist}>
              For Developers
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
