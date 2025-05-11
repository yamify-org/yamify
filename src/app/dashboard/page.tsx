"use client";

import LeftPanel from "./_components/LeftPanel";
import "@/styles/Dashboard.css";
import RightPanel from "./_components/RightPanel";
import { useState } from "react";

export default function SignIn() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  return (
    <div className="dashboard">
      <section>
        <LeftPanel
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
        <RightPanel expandRightPanel={expandRightPanel} />
      </section>
    </div>
  );
}
