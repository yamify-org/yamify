import React, { RefObject } from "react";
import "@/styles/JoinWaitlistSection.css";

type Props = {
  joinWaitlistRef: RefObject<HTMLDivElement | null>;
};

const JoinWaitlistSection = ({ joinWaitlistRef }: Props) => {
  const classMap = {
    highlight: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      39, 40, 59, 60, 79, 80, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
      109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    ],
  };

  return (
    <section className="join-waitlist-section" ref={joinWaitlistRef}>
      <div className="first-container">
        <div className="boxes-container">
          {[...Array(120)].map((_, i) => {
            let boxClass = "grid-box";

            Object.entries(classMap).forEach(([key, indexes]) => {
              if (indexes.includes(i)) boxClass += ` ${key}`;
            });

            return <div key={i} className={boxClass}></div>;
          })}
        </div>
        <div className="groups-container">
          <div className="group">
            <h1>Learners</h1>
            <p>
              Learn with real Kubernetes clusters. Free tiers, guided tutorials,
              and no infra hassle.
            </p>
          </div>
          <div className="group">
            <h1>Freelancers</h1>
            <p>
              Impress clients with fast, stable deployments. No surprise costs.
            </p>
          </div>
          <div className="group">
            <h1>Startups</h1>
            <p>
              Launch secure, scalable apps without DevOps overhead or vendor
              lock-in.
            </p>
          </div>
        </div>
      </div>

      <div className="second-container">
        <h1>Be the First to Build the Future. Join the WaitList</h1>
        <p>
          We’re opening early access to developers, startups, and creators who
          want to be part of the next evolution in cloud infrastructure —
          powered by AI, built for Africa, and open to the world. Whether you’re
          launching an MVP, deploying full-scale apps, or experimenting with AI
          workloads, this platform adapts to your needs.
        </p>
        <div className="btn">
          <div className="contain">
            <span>Join the WaitList</span>
            <span className="hover-text">Join the WaitList</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlistSection;
