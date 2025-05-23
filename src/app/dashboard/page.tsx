"use client";

import LeftPanel from "./_components/LeftPanel";
import "@/styles/Dashboard.css";
import RightPanel from "./_components/RightPanel";
import { useState } from "react";
import CreateYamDialog from "./_components/CreateYamDialog";
import CreateWorkspaceDialog from "./_components/CreateWorkspaceDialog";

export default function Dashboard() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [showYamDialog, setShowYamDialog] = useState(false);
  const [showWorkspaceDialog, setShowWorkspaceDialog] = useState(false);

  const loadingYamTxts = [
    "Creating your cluster with optimized defaults…",
    "Auto-scaling and security being configured in the background.",
    "We’re applying AI-powered enhancements for smooth performance.",
    "You’ll be ready to build in just a moment.",
  ];

  const loadingWorkspaceTxts = [
    "Welcome to Yamify—your reliable, affordable cloud.",
    "We’re setting up your workspace, tools, and credits.",
    "AI is tailoring your experience now and adding your yam...",
    "Your virtual datacenter is getting ready.",
    "In a second now...your workspace and yam will be set.",
  ];

  return (
    <div className="dashboard">
      {showYamDialog && (
        <CreateYamDialog
          loadingTxts={loadingYamTxts}
          setShowYamDialog={setShowYamDialog}
        />
      )}
      {showWorkspaceDialog && (
        <CreateWorkspaceDialog
          loadingTxts={loadingWorkspaceTxts}
          setShowYamDialog={setShowWorkspaceDialog}
        />
      )}

      <section>
        <LeftPanel
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
          setShowYamDialog={setShowYamDialog}
          setShowWorkspaceDialog={setShowWorkspaceDialog}
        />
        <RightPanel expandRightPanel={expandRightPanel} />
      </section>
    </div>
  );
}
