import React, { RefObject } from "react";
import "@/styles/CapabilitySection.css";
import ActionCard from "./ActionCard";

type Props = {
  capabilityRef: RefObject<HTMLDivElement | null>;
  lightMode: boolean;
};

const CapabilitySection = ({ capabilityRef, lightMode }: Props) => {
  const classMap = {
    highlight: [
      0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23,
      24, 25, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 43, 44, 45, 46, 47, 48,
      49, 53, 54, 55, 56, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
      72, 73, 74, 75, 76, 77, 78, 79,
    ],
  };

  const capabilities = [
    {
      title: "Cluster Lifecycle",
      solution: "Forget maintenance stress. Upgrades & fixes are on autopilot.",
    },
    {
      title: "Auto Scalability",
      solution:
        "Your app scales automatically—up, down, left, right. No babysitting.",
    },
    {
      title: "Multi-Cluster Deployments",
      solution: "Local to global availability, always online.",
    },
    {
      title: "Security & Compliance",
      solution:
        "Role-based access, trusted containers, private networking—secure by default.",
    },
    {
      title: "Observability",
      solution: "Logs, alerts, dashboards—all built in and always available.",
    },
    {
      title: "Service Mesh & Networking",
      solution: "Advanced routing and zero-trust architecture baked in.",
    },
    {
      title: "Developer Productivity",
      solution: "CI/CD and GitOps flows already wired. Ship faster.",
    },
    {
      title: "Cost Optimization",
      solution: "Pay for what runs. Nothing more. Predictable and smart.",
    },
    {
      title: "OS Support",
      solution: "Run Windows or Linux in the same cluster, no extra work.",
    },
  ];

  return (
    <section
      className={`capability-section ${lightMode && "light-mode"}`}
      ref={capabilityRef}
    >
      <div className="first-container">
        <div className="content">
          <h1>Capabilities that Work for You—Not Against You</h1>
          <div className="wrap">
            <div className="btn">
              <div className="contain">Reliability</div>
            </div>
            <div className="btn">
              <div className="contain">Affordability</div>
            </div>
          </div>
          <p>
            Every tool you didn’t know you were missing. Capabilities that Work
            for You—Not Against You
          </p>
        </div>

        <div className="boxes-container">
          {[...Array(80)].map((_, i) => {
            let boxClass = "grid-box";

            Object.entries(classMap).forEach(([key, indexes]) => {
              if (indexes.includes(i)) boxClass += ` ${key}`;
            });

            return <div key={i} className={boxClass}></div>;
          })}
        </div>
      </div>

      <div className="second-container">
        <div className="capability-container">
          {capabilities.map((capability, index) => (
            <div key={index} className="capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.solution}</p>
            </div>
          ))}
        </div>
        <ActionCard
          lightMode={lightMode}
          rmBorder={true}
          tagContents={["Designed for Africa,", "Built for Developers."]}
        />
      </div>
    </section>
  );
};

export default CapabilitySection;
