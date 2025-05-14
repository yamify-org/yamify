"use client";

import "@/styles/Dashboard.css";
import { useState } from "react";
import LeftPanel from "../../_components/LeftPanel";
import RightPanelYams from "./_components/RightPanelYams";
import CreateYamDialog from "../../_components/CreateYamDialog";

export default function YamsPage() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [showYamDialog, setShowYamDialog] = useState(false);

  return (
    <div className="dashboard">
      {showYamDialog && <CreateYamDialog setShowYamDialog={setShowYamDialog} />}
      <section>
        <LeftPanel
          setShowYamDialog={setShowYamDialog}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
        <RightPanelYams
          expandRightPanel={expandRightPanel}
          setShowYamDialog={setShowYamDialog}
        />
      </section>
    </div>
  );
}
