"use client";

import "@/styles/Dashboard.css";
import { useEffect, useState } from "react";
import LeftPanel from "../../../_components/LeftPanel";
import CreateYamDialog from "../../../_components/CreateYamDialog";
import DeployWordpressDialog from "../../../_components/DeployWordpressDialog";
import RightPanelYam from "./_components/RightPanelYam";
import { SelectWorkspace, SelectYam } from "@/types/server";
import fetchWorkspaceList from "@/libs/queries/fetch-workspace-list";
import fetchYam from "@/libs/queries/fetch-yam";
import { useParams } from "next/navigation";

export default function YamPage() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [showYamDialog, setShowYamDialog] = useState(false);
  const [showWordpressDialog, setShowWordpressDialog] = useState(false);
  const [workspaces, setWorkspaces] = useState<SelectWorkspace[]>([]);
  const [currentYam, setCurrentYam] = useState<SelectYam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const params = useParams();
  const yamName = params.name as string;
  const slug = decodeURIComponent(yamName);

  useEffect(() => {
    async function getWorkspaces() {
      setLoading(true)
      try {
        const data = await fetchWorkspaceList();
        setWorkspaces(data);
        setLoading(false)
      } catch (err) {
        console.error(err);
        setError('Could not load workspaces. Please try again later.');
        setLoading(false)
      }
    }
    getWorkspaces();
  }, []);
  
  // Fetch the current yam
  useEffect(() => {
    async function getYam() {
      try {
        const data = await fetchYam({
          name: slug
        });
        setCurrentYam(data);
      } catch (err) {
        console.error(err);
        setError('Could not load yam. Please try again later.');
      }
    }
    getYam();
  }, [slug]);

  const loadingYamTxts = [
    "Creating your cluster with optimized defaults…",
    "Auto-scaling and security being configured in the background.",
    "We're applying AI-powered enhancements for smooth performance.",
    "You'll be ready to build in just a moment.",
  ];

  const loadingWordpressTxts = [
    "Deploying WordPress with optimized settings...",
    "Setting up the database and web server...",
    "Configuring security and performance features...",
    "Almost ready to start building your website...",
    "Your WordPress site will be available in a moment...",
  ];

  console.log(error);

  return (
    <div className="dashboard">
      {showYamDialog && (
        <CreateYamDialog
          workspaces={workspaces}
          loadingTxts={loadingYamTxts}
          setShowYamDialog={setShowYamDialog}
        />
      )}
      {showWordpressDialog && currentYam && (
        <DeployWordpressDialog
          workspaces={workspaces}
          loadingTxts={loadingWordpressTxts}
          setShowWordpressDialog={setShowWordpressDialog}
          selectedYam={currentYam}
        />
      )}
      <section>
        {!loading && <LeftPanel
        workspaces={workspaces}
          setShowYamDialog={setShowYamDialog}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />}
        <RightPanelYam
          expandRightPanel={expandRightPanel}
          setShowWordpressDialog={setShowWordpressDialog}
        />
      </section>
    </div>
  );
}
