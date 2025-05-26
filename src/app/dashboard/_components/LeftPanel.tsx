import React, { useEffect, useRef, useState } from "react";
import "@/styles/LeftPanelDashboard.css";
import Image from "next/image";
import Link from "next/link";
import routes from "@/libs/routes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  setExpandRightPanel: (Callback: boolean) => void;
  setShowYamDialog: (Callback: boolean) => void;
  setShowWorkspaceDialog?: (Callback: boolean) => void;
  expandRightPanel: boolean;
};
const LeftPanel = ({
  expandRightPanel,
  setExpandRightPanel,
  setShowYamDialog,
  setShowWorkspaceDialog,
}: Props) => {
  const [collapseWallet, setCollapseWallet] = useState(false);
  const [collapseYam, setCollapseYam] = useState(true);
  const [dropDownWorkspace, setDropDownWorkspace] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropDownWorkspace(false);
      }
    };

    if (dropDownWorkspace) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownWorkspace]);

  const pathname = usePathname();

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
              <Image
                src={"/svgs/panel_logo.svg"}
                alt="Yamify Logo"
                className="logo-img"
                width={12}
                onClick={() => setExpandRightPanel(!expandRightPanel)}
                style={{ cursor: "pointer" }}
                height={15.2}
              />
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
          <Link href={routes.dashboard.overview} className="link">
            <Image src="/svgs/globe.svg" alt="" width={15} height={15} />
            <p>Community</p>
          </Link>
          <div
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
          </div>

          <div className="workspace-container">
            <div className="workspace-link" ref={dropdownRef}>
              <div className="wrap">
                <Image
                  src="/svgs/user_green.svg"
                  alt=""
                  width={18}
                  height={18}
                />
                <p>Marcus&apos;s Workspace</p>
              </div>

              <Image
                src="/svgs/more_horizontal.svg"
                className="more-icon"
                alt=""
                width={15}
                height={15}
                onClick={() => setDropDownWorkspace((prev) => !prev)}
              />

              <AnimatePresence>
                {dropDownWorkspace && (
                  <motion.div
                    className="drop-down"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="workspace-row">
                      <div className="wr">
                        <Image
                          src="/svgs/user_green.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                        <p>Marcus’s Workspace</p>
                      </div>

                      <Image
                        src="/svgs/checkmark.svg"
                        className="checkmark"
                        alt=""
                        width={15}
                        height={15}
                        onClick={() => setDropDownWorkspace(false)}
                      />
                    </div>

                    <div className="workspace-end">
                      <div
                        className="wr"
                        onClick={() => {
                          if (setShowWorkspaceDialog) {
                            setShowWorkspaceDialog(true);
                            setDropDownWorkspace(false);
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href={routes.dashboard.yams.all}
              className={`link ${
                pathname === routes.dashboard.yams.all && "active"
              }`}
            >
              <Image src="/svgs/cluster.svg" alt="" width={15} height={15} />
              <p>All Yams</p>
            </Link>
            <Link href={routes.dashboard.overview} className="link">
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
            </Link>
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
