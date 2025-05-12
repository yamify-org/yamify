"use client";

import "@/styles/Dashboard.css";
import { useState } from "react";
import LeftPanel from "../../_components/LeftPanel";
import RightPanelYams from "./_components/RightPanelYams";

export default function YamsPage() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  return (
    <div className="dashboard">
      <section>
        <LeftPanel
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
        <RightPanelYams expandRightPanel={expandRightPanel} />
      </section>
    </div>
  );
}
