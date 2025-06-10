import React from "react";
import Button from "../Button/Button";
import "@/styles/ReadyToBuild.css";
import Image from "next/image";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
};

const ReadyToBuild = ({ setJoinWaitlistModal }: Props) => {
  return (
    <div className="ready-to-build-section">
      <section>
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
        <div className="container">
          <div className="left">
            <div className="content">
              <h1>Ready to Build Smarter, Not Harder?</h1>
              <p>
                Spin up your own virtual cloud, deploy in minutes, and scale
                with confidence — all without touching Kubernetes commands.
              </p>
            </div>

            <Button
              text="Join Waitlist"
              yellow={true}
              linkBtn={false}
              onClick={() => setJoinWaitlistModal(true)}
            />
          </div>

          <div className="right">
            <div className="blurred-drop"></div>
            <Image
              src="/svgs/nameofyam.svg"
              alt=""
              width={807.315}
              height={499.526}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReadyToBuild;
