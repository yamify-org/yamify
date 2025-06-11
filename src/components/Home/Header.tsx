"use client";

import Image from "next/image";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";
// import { motion } from "framer-motion";
import "@/styles/Header.css";
// import routes from "@/libs/routes";
import Button from "../Button/Button";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  setLightMode: (value: boolean) => void;
  lightMode: boolean;
  heroRef: RefObject<HTMLDivElement | null>;
  workIfRef: RefObject<HTMLDivElement | null>;
  capabilityRef: RefObject<HTMLDivElement | null>;
  yamLayerRef: RefObject<HTMLDivElement | null>;
  joinWaitlistRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
};

const Header = ({
  // setJoinWaitlistModal,
  heroRef,
  workIfRef,
  capabilityRef,
  yamLayerRef,
  joinWaitlistRef,
  // contactRef,
  // setLightMode,
  lightMode,
}: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  console.log({isMobile})

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    // Run the function once to set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setOpenMenu(false);
    scrollToSection(heroRef);
  };

  const handleScrollToWorkIf = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenu(false);
    scrollToSection(workIfRef);
  };

  const handleScrollToCapability = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenu(false);
    scrollToSection(capabilityRef);
  };

  const handleScrollToYamLayer = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenu(false);
    scrollToSection(yamLayerRef);
  };

  // const handleScrollToContact = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpenMenu(false);
  //   scrollToSection(contactRef);
  // };

  const handleScrollToJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenu(false);
    scrollToSection(joinWaitlistRef);
  };

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // Delay to ensure DOM is ready after navigation
  };

  return (
    <header
      className={`main-header ${scrolled ? "scrolled" : ""} ${
        lightMode && "light-mode"
      }`}
    >
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
                src="/svgs/Menu.svg"
                alt=""
                width={20}
                height={20}
                onClick={() => setOpenMenu(true)}
              />
            )}
          </div>

          <Image
            src={
              !lightMode
                ? "/svgs/yamify_logo_sm.svg"
                : "/svgs/yamify_logo_sm_lm.svg"
            }
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
          <div className="nav-link" onClick={handleScrollToJoinWaitlist}>
            <span>Contact</span>
            <span className="hover-text">Contact</span>
          </div>
        </nav>

        <div className="action-btns">
          <Button
            text="Book a Demo"
            href={"https://calendly.com/luc-yamify/30min"}
            yellow={false}
            linkBtn={true}
            target="_blank"
          />

          <Button
            text="Get started"
            href={"/auth/sign-in"}
            yellow={true}
            linkBtn={true}
          />
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

            <Image
              className="end"
              src="/svgs/yamify_gd.svg"
              alt=""
              width={797}
              height={306}
            />
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
