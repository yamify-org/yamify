"use client";

import "@/styles/Dashboard.css";
import { useState } from "react";
import LeftPanel from "../../_components/LeftPanel";
import CreateYamDialog from "../../_components/CreateYamDialog";
import RightPanelYam from "./_components/RightPanelYam";

export default function YamPage() {
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
        <RightPanelYam expandRightPanel={expandRightPanel} />
      </section>
    </div>
  );
}
