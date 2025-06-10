"use client";

import CapabilitySection from "@/components/Home/CapabilitySection";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import HeroSection from "@/components/Home/HeroSection";
import JoinWaitlistModal from "@/components/Home/JoinWaitlistModal";
import JoinWaitlistSection from "@/components/Home/JoinWaitlistSection";
import WhatIfSection from "@/components/Home/WhatIfSection";
import YamLayersSection from "@/components/Home/YamLayersSection";
// import { useNotification } from "@/hooks/useNotification";
import { NotificationContainer } from "@/components/Notification";

import "@/styles/Home.css";
import { useRef, useState } from "react";
import NewHeroSection from "@/components/Home/NewHeroSection";
import NewCapacitySection from "@/components/Home/NewCapacitySection";
import SpeakStackSection from "@/components/Home/SpeakStackSection";
import WhatIsYamifySection from "@/components/Home/WhatIsYamifySection";
import ReadyToBuild from "@/components/Home/ReadyToBuild";

export default function Home() {
  const [joinWaitlistModal, setJoinWaitlistModal] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  // const { success, error, warning, info } = useNotification();

  const heroRef = useRef<HTMLDivElement | null>(null);
  const workIfRef = useRef<HTMLDivElement | null>(null);
  const capabilityRef = useRef<HTMLDivElement | null>(null);
  const yamLayerRef = useRef<HTMLDivElement | null>(null);
  const joinWaitlistRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // const handleClick = () => {
  //   error("Opération failed !", "Error", 5000);
  // };

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
      <NewHeroSection setJoinWaitlistModal={setJoinWaitlistModal} />
      {/* <WhatIsYamifySection /> */}
      <NewCapacitySection />
      <SpeakStackSection />
      <ReadyToBuild setJoinWaitlistModal={setJoinWaitlistModal} />

      {/* <HeroSection heroRef={heroRef} lightMode={lightMode} /> */}

      {/* <button onClick={handleClick}>Afficher une notification</button> */}
      {/* <div className="section-containers">
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
      </div> */}
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

      <NotificationContainer lightMode={lightMode} />
    </div>
  );
}
