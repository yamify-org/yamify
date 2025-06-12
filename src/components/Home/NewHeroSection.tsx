import "@/styles/NewHeroSection.css";
import ActionTexts from "./ActionTexts";
import Button from "../Button/Button";
import routes from "@/libs/routes";
import Image from "next/image";
import { RefObject } from "react";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  heroRef: RefObject<HTMLDivElement | null>;
};

const NewHeroSection = ({ setJoinWaitlistModal, heroRef }: Props) => {
  return (
    <div className="new-hero-section" ref={heroRef}>
      <section>
        <ActionTexts
          lightMode={false}
          tagContents={["Local.", "Fast.", "Reliable."]}
        />

        <div className="content-container">
          <h2>Where Your Data Lives and Stays</h2>
          <p>
            Yamify is the AI cloud infrastructure built for how Africa builds -
            control without compromise. From local billing to one-click
            deployment and AI-powered automation, it’s everything you need to
            build, launch, and scale, right where you are.
          </p>
          <div className="btns-wrap">
            <Button
              text="Join Waitlist"
              href={routes.auth.signup}
              yellow={true}
              linkBtn={false}
              onClick={() => setJoinWaitlistModal(true)}
            />
          </div>
        </div>

        <div className="drop-img">
          <Image
            className="backdrop"
            src="/svgs/yam_dashboard.svg"
            alt=""
            width={880}
            height={578.947}
          />
          <div className="blurred-backdrop">
            <div className="row flex">
              <div className="first drop"></div>
              <div className="second drop"></div>
            </div>
            <div className="row flex">
              <div className="third drop"></div>
              <div className="fourth drop"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewHeroSection;
