import React, { RefObject } from "react";
import "@/styles/Footer.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  lightMode: boolean;
  heroRef: RefObject<HTMLDivElement | null>;
  workIfRef: RefObject<HTMLDivElement | null>;
  capabilityRef: RefObject<HTMLDivElement | null>;
  yamLayerRef: RefObject<HTMLDivElement | null>;
  joinWaitlistRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
};

const Footer = ({
  setJoinWaitlistModal,
  heroRef,
  workIfRef,
  capabilityRef,
  yamLayerRef,
  joinWaitlistRef,
  contactRef,
  lightMode,
}: Props) => {
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
    <footer ref={contactRef} className={`${lightMode && "light-mode"}`}>
      <section>
        <div className="container-footer">
          <div className="left">
            <h2>Navigations</h2>
            {/* <Image
              src="/svgs/top_left_corner_pin.svg"
              className="pin bottom-left"
              alt=""
              width={21}
              height={21}
            />
            <Image
              src="/svgs/top_left_corner_pin.svg"
              className="pin bottom-right"
              alt=""
              width={21}
              height={21}
            />
            <Image
              src="/svgs/top_right_corner_pin.svg"
              className="pin top-right"
              alt=""
              width={21}
              height={21}
            /> */}

            <div className="links">
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
              <div
                className="nav-link"
                onClick={() => setJoinWaitlistModal(true)}
              >
                <span>Join WaitList</span>
                <span className="hover-text">Join WaitList</span>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Image
              src="/svgs/top_right_corner_pin.svg"
              className="pin top-right"
              alt=""
              width={21}
              height={21}
            /> */}

            <div className="content">
              <Image
                src={"/svgs/yamify_logo_lg.svg"}
                alt="yamify logo"
                className="logo"
                width={30}
                height={38}
              />
              <p>
                Yamify is Africa’s first sovereign cloud infrastructure
                platform, built to empower developers, startups, and enterprises
                with instant access to secure, scalable resources.{" "}
              </p>
            </div>

            <div className="socials">
              <Link href="#" target="_blank">
                <Image src="/svgs/Facebook.svg" alt="" width={20} height={20} />
              </Link>
              <Link href="#" target="_blank">
                <Image src="/svgs/Github.svg" alt="" width={20} height={20} />
              </Link>
              <Link href="#" target="_blank">
                <Image src="/svgs/Linkedin.svg" alt="" width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="bottom">
          {/* <Image
            src="/svgs/plus_pin.svg"
            className="pin top-right"
            alt=""
            width={21}
            height={21}
          />

          <Image
            src="/svgs/plus_pin.svg"
            className="pin bottom-left"
            alt=""
            width={21}
            height={21}
          /> */}

          {/* <Image
            src={
              !lightMode
                ? "/svgs/yamify_logo_lg.svg"
                : "/svgs/yamify_logo_lg_lm.svg"
            }
            alt="yamify logo"
            className="logo"
            width={30}
            height={38}
          />

          <p>
            Yamify is Africa’s first sovereign cloud infrastructure platform,
            built to empower developers, startups, and enterprises with instant
            access to secure, scalable resources.{" "}
          </p> */}

          <Image
            className="end"
            src="/svgs/yamify_gd.svg"
            alt=""
            width={797}
            height={306}
          />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
