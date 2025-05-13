"use client";

import LeftPanel from "./_components/LeftPanel";
import "@/styles/Dashboard.css";
import RightPanel from "./_components/RightPanel";
import { useState } from "react";
import CreateYamDialog from "./_components/CreateYamDialog";

export default function Dashboard() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [showYamDialog, setShowYamDialog] = useState(false);

  return (
    <div className="dashboard">
      {showYamDialog && <CreateYamDialog setShowYamDialog={setShowYamDialog} />}
      <section>
        <LeftPanel
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
          setShowYamDialog={setShowYamDialog}
        />
        <RightPanel expandRightPanel={expandRightPanel} />
      </section>
    </div>
  );
}
