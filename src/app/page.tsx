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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const workIfRef = useRef<HTMLDivElement | null>(null);
  const capabilityRef = useRef<HTMLDivElement | null>(null);
  const yamLayerRef = useRef<HTMLDivElement | null>(null);
  const joinWaitlistRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`home ${joinWaitlistModal && "overflow"}`}>
      {joinWaitlistModal && (
        <JoinWaitlistModal
          joinWaitlistModal={joinWaitlistModal}
          setJoinWaitlistModal={setJoinWaitlistModal}
        />
      )}

      <Header
        setJoinWaitlistModal={setJoinWaitlistModal}
        heroRef={heroRef}
        workIfRef={workIfRef}
        capabilityRef={capabilityRef}
        yamLayerRef={yamLayerRef}
        joinWaitlistRef={joinWaitlistRef}
      />
      <HeroSection heroRef={heroRef} />

      <div className="section-containers">
        <WhatIfSection workIfRef={workIfRef} />
        <CapabilitySection capabilityRef={capabilityRef} />
        <YamLayersSection yamLayerRef={yamLayerRef} />
        <JoinWaitlistSection joinWaitlistRef={joinWaitlistRef} />
      </div>
      <Footer />
    </div>
  );
}
