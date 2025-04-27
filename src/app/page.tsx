"use client";

import CapabilitySection from "@/components/CapabilitySection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JoinWaitlistModal from "@/components/JoinWaitlistModal";
import JoinWaitlistSection from "@/components/JoinWaitlistSection";
import WhatIfSection from "@/components/WhatIfSection";
import YamLayersSection from "@/components/YamLayersSection";
import "@/styles/Home.css";
import { useRef, useState } from "react";

export default function Home() {
  const [joinWaitlistModal, setJoinWaitlistModal] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const workIfRef = useRef<HTMLDivElement | null>(null);
  const capabilityRef = useRef<HTMLDivElement | null>(null);
  const yamLayerRef = useRef<HTMLDivElement | null>(null);
  const joinWaitlistRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`home ${joinWaitlistModal && "overflow"} ${
        lightMode && "light-mode"
      }`}
    >
      {joinWaitlistModal && (
        <JoinWaitlistModal
          joinWaitlistModal={joinWaitlistModal}
          setJoinWaitlistModal={setJoinWaitlistModal}
          lightMode={lightMode}
        />
      )}

      <Header
        setJoinWaitlistModal={setJoinWaitlistModal}
        heroRef={heroRef}
        workIfRef={workIfRef}
        capabilityRef={capabilityRef}
        yamLayerRef={yamLayerRef}
        joinWaitlistRef={joinWaitlistRef}
        contactRef={contactRef}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
      <HeroSection
        heroRef={heroRef}
        lightMode={lightMode}
        setJoinWaitlistModal={setJoinWaitlistModal}
      />

      <div className="section-containers">
        <WhatIfSection workIfRef={workIfRef} lightMode={lightMode} />
        <CapabilitySection
          capabilityRef={capabilityRef}
          lightMode={lightMode}
        />
        <YamLayersSection yamLayerRef={yamLayerRef} lightMode={lightMode} />
        <JoinWaitlistSection
          setJoinWaitlistModal={setJoinWaitlistModal}
          joinWaitlistRef={joinWaitlistRef}
          lightMode={lightMode}
        />
      </div>
      <Footer
        contactRef={contactRef}
        setJoinWaitlistModal={setJoinWaitlistModal}
        heroRef={heroRef}
        workIfRef={workIfRef}
        capabilityRef={capabilityRef}
        yamLayerRef={yamLayerRef}
        lightMode={lightMode}
        joinWaitlistRef={joinWaitlistRef}
      />
    </div>
  );
}
