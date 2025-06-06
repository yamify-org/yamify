'use client'

import React, { useState } from "react";
import "@/styles/LeftPanelDashboard.css";
import Image from "next/image";
import Link from "next/link";
import routes from "@/libs/routes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SelectWorkspace } from "@/types/server";

type Props = {
  setExpandRightPanel: (Callback: boolean) => void;
  setShowYamDialog: (Callback: boolean) => void;
  setShowWorkspaceDialog?: (Callback: boolean) => void;
  expandRightPanel: boolean;
  workspaces: SelectWorkspace[]
};
const LeftPanel = ({
  expandRightPanel,
  setExpandRightPanel,
  setShowYamDialog,
  setShowWorkspaceDialog,
  workspaces
}: Props) => {
<<<<<<< HEAD
  // const [collapseWallet, setCollapseWallet] = useState(false);
  const [collapseYam, setCollapseYam] = useState(true);
  // const [sidebar, setSidebar] = useState(false);
=======
  const [selectedWorkspace, setSelectedWorkspace] = useState<SelectWorkspace>(workspaces[0]);
  const [collapseWallet, setCollapseWallet] = useState(false);
  const [collapseYam, setCollapseYam] = useState(true);
  const [dropDownWorkspace, setDropDownWorkspace] = useState(false);
  const { user } = useUser();
>>>>>>> 18406737a1bb3fca4a103e5b3a319cf72d6e7130

  
  const pathname = usePathname();
  
  if(!user) return

  return (
    <div className={`left-panel ${expandRightPanel && "not-expand"}`}>
      <div className="contain">
        <div className="head">
          <div className="logo">
            {!expandRightPanel ? (
              <Image
                src={"/svgs/panel_logo.svg"}
                alt="Yamify Logo"
                className="logo-img"
                width={12}
                height={15.2}
              />
            ) : (
              <div className="wrap-head">
                <Image
                  // onMouseOver={() => setSidebar(true)}
                  // onMouseLeave={() => setSidebar(false)}
                  src={"/svgs/panel_logo.svg"}
                  alt="Yamify Logo"
                  className="logo-img"
                  width={12}
                  onClick={() => setExpandRightPanel(!expandRightPanel)}
                  style={{ cursor: "pointer" }}
                  height={15.2}
                />
                {/* {sidebar && (
                  <Image
                    src="/svgs/sidebar.svg"
                    alt=""
                    className="side-bar-logo"
                    height={15}
                    width={15}
                    onClick={() => setExpandRightPanel(!expandRightPanel)}
                  />
                )} */}
              </div>
            )}
            <h1>Yamify</h1>
          </div>

          <Image
            src="/svgs/sidebar.svg"
            alt=""
            className="side-bar"
            height={15}
            width={15}
            onClick={() => setExpandRightPanel(!expandRightPanel)}
          />
        </div>

        <div className="links-container">
          <Link
            href={routes.dashboard.overview}
            className={`link ${
              pathname === routes.dashboard.overview && "active"
            }`}
          >
            <Image src="/svgs/grid.svg" alt="" width={15} height={15} />
            <p>Dashboard</p>
          </Link>
          {/* <Link href={routes.dashboard.overview} className="link">
            <Image src="/svgs/globe.svg" alt="" width={15} height={15} />
            <p>Community</p>
          </Link> */}
          {/* <div
            className={`wallet-setup ${collapseWallet && "collapse-active"}`}
          >
            <div className="wrap">
              <h2>
                Get NGN 100,000 <br /> Pay As You Go Credits
              </h2>
              {!collapseWallet ? (
                <Image
                  src="/svgs/minimize.svg"
                  onClick={() => setCollapseWallet(!collapseWallet)}
                  alt=""
                  height={15}
                  width={15}
                />
              ) : (
                <Image
                  src="/svgs/maximize.svg"
                  onClick={() => setCollapseWallet(!collapseWallet)}
                  alt=""
                  height={15}
                  width={15}
                />
              )}
            </div>
            <p>
              Spin up clusters, launch apps, and explore without stress. Your
              first workspace covers up to 3 full clusters for 2 weeks.
            </p>
            <button>
              <Image src="/svgs/card.svg" alt="" height={15} width={15} />
              <div className="txt">Set up wallet</div>
            </button>
          </div> */}

          <div className="workspace-container">
            <div className="workspace-link">
              <div className="wrap">
                <Image
                  src={user?.imageUrl ?? "/svgs/user_green.svg"}
                  alt=""
                  width={18}
                  height={18}
                />
                <p>{selectedWorkspace?.name}</p>
              </div>

              <Image
                src="/svgs/more_horizontal.svg"
                className="more-icon"
                alt=""
                width={15}
                height={15}
                onClick={() => setDropDownWorkspace(!dropDownWorkspace)}
              />

              {dropDownWorkspace && (
                <div className="drop-down">
                  <div className="workspace-row">
                    <div className="wr">
                      <Image
                        src={user?.imageUrl ?? "/svgs/user_green.svg"}
                        alt=""
                        width={18}
                        height={18}
                      />
                      <p>{selectedWorkspace.name}</p>
                    </div>

                    <Image
                      src="/svgs/checkmark.svg"
                      className="checkmark"
                      alt=""
                      width={15}
                      height={15}
                      onClick={() => setDropDownWorkspace(!dropDownWorkspace)}
                    />
                  </div>

                  {workspaces && workspaces.filter(workspace => workspace.id !== selectedWorkspace.id).map(workspace => (
                    <div className="workspace-row" key={workspace.id} onClick={() => setSelectedWorkspace(workspace)}>
                      <div className="wr">
                        <Image
                          src={user?.imageUrl ?? "/svgs/user_green.svg"}
                          alt=""
                          width={18}
                          height={18}
                        />
                        <p>{workspace.name}</p>
                      </div>
                    </div>
                  ))}

                  <div className="workspace-end">
                    <div
                      className="wr"
                      onClick={() => {
                        if (setShowWorkspaceDialog) {
                          setShowWorkspaceDialog(true);
                        }
                      }}
                    >
                      <Image
                        src="/svgs/plus.svg"
                        alt=""
                        width={15}
                        height={15}
                      />
                      <p>Create new workspace</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href={routes.dashboard.yams.all(selectedWorkspace.id)}
              className={`link ${
                pathname === routes.dashboard.yams.all(selectedWorkspace.id) && "active"
              }`}
            >
              <Image src="/svgs/cluster.svg" alt="" width={15} height={15} />
              <p>All Yams</p>
            </Link>
            {/* <Link href={routes.dashboard.overview} className="link">
              <Image src="/svgs/list.svg" alt="" width={15} height={15} />
              <p>Marketplace</p>
            </Link>
            <Link href={routes.dashboard.overview} className="link">
              <Image src="/svgs/bar.svg" alt="" width={15} height={15} />
              <p>Usage & Billing</p>
            </Link>
            <Link href={routes.dashboard.overview} className="link">
              <Image src="/svgs/settings.svg" alt="" width={15} height={15} />
              <p>Admin settings</p>
            </Link>
            <Link href={routes.dashboard.overview} className="link">
              <Image src="/svgs/users.svg" alt="" width={15} height={15} />
              <p>People</p>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="yam-container">
        <div className="wrap" onClick={() => setCollapseYam(!collapseYam)}>
          <h2>Yams</h2>
          <Image
            src={collapseYam ? "/svgs/caret_up.svg" : "/svgs/caret_down.svg"}
            alt=""
            width={15}
            height={15}
          />
        </div>

        <AnimatePresence initial={false}>
          {collapseYam && (
            <motion.div
              key="yam-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="yams"
              style={{ overflow: "hidden" }}
            >
              <div className="yam">
                <Image src="/svgs/cluster.svg" alt="" width={15} height={15} />
                <h2>default yam</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="btn-contain">
          <button onClick={() => setShowYamDialog(true)}>
            <div className="row">
              <Image src="/svgs/cluster.svg" alt="" width={15} height={15} />
              <p> Create a Yam</p>
            </div>
            <Image src="/svgs/plus.svg" alt="" width={15} height={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
