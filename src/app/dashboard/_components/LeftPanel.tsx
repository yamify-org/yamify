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
  setShowWordpressDialog?: (Callback: boolean) => void;
  expandRightPanel: boolean;
  workspaces: SelectWorkspace[]
};
const LeftPanel = ({
  expandRightPanel,
  setExpandRightPanel,
  setShowYamDialog,
  setShowWorkspaceDialog,
  setShowWordpressDialog,
  workspaces
}: Props) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<SelectWorkspace>(workspaces[0]);
  const [collapseWallet, setCollapseWallet] = useState(false);
  const [collapseYam, setCollapseYam] = useState(true);
  const [dropDownWorkspace, setDropDownWorkspace] = useState(false);
  const { user } = useUser();

  
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
          
          {setShowWordpressDialog && (
            <button
              onClick={() => setShowWordpressDialog(true)}
              className="wordpress-btn"
            >
              <div className="row">
                <svg width="15" height="15" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128 0C57.3 0 0 57.3 0 128C0 198.7 57.3 256 128 256C198.7 256 256 198.7 256 128C256 57.3 198.7 0 128 0ZM21.1 128C21.1 112.3 24.7 97.4 31.1 84L96.7 231.5C52.6 215.8 21.1 175.5 21.1 128ZM128 234.9C116.9 234.9 106.2 233.3 96.1 230.3L134.8 133.9L174.5 226.6C174.6 226.8 174.7 227 174.8 227.2C160.3 232.2 144.5 234.9 128 234.9ZM142.2 77.3C148.3 77.1 153.8 76.5 153.8 76.5C159.3 75.9 158.7 67.7 153.2 68.3C153.2 68.3 136.6 69.5 125.4 69.5C115 69.5 98.1 68.3 98.1 68.3C92.6 67.7 92 76.5 97.5 76.5C97.5 76.5 102.4 77.1 108 77.3L128.1 130.3L107.5 192.5L66.6 77.3C72.7 77.1 78.2 76.5 78.2 76.5C83.7 75.9 83.1 67.7 77.6 68.3C77.6 68.3 61 69.5 49.8 69.5C47.7 69.5 45.3 69.5 42.8 69.4C60.5 40.9 92.2 21.1 128 21.1C155.3 21.1 180.1 32.6 198.2 51.3C197.8 51.3 197.4 51.2 197 51.2C186.6 51.2 179.1 60 179.1 69.5C179.1 77.3 183.6 83.9 188.4 92C192 98.3 196.3 106.3 196.3 117.6C196.3 124.6 194.1 132.8 190.2 144.2L177.1 184.2L142.2 77.3ZM201.3 78.2C210.9 93.4 216.9 111.9 216.9 128C216.9 172.4 189.5 210.4 149.8 228.1L183.8 135.8C191.3 119.8 193.8 107.1 193.8 95.9C193.8 89.2 193.2 83.1 191.9 77.5C195.2 77.7 198.3 78.2 201.3 78.2Z" fill="#00A67E"/>
                </svg>
                <p> Deploy WordPress</p>
              </div>
              <Image src="/svgs/plus.svg" alt="" width={15} height={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
