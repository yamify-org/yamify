import React, { useState } from "react";
import "@/styles/CreateYamDialog.css";
import Image from "next/image";
import CreateAnimation from "@/components/CreateAnimation";
import { createYamAction } from "../_actions";
import { SelectWorkspace } from "@/types/server";
import { useRouter } from "next/navigation";

type Props = {
  setShowYamDialog: (Callback: boolean) => void;
  loadingTxts: string[];
  workspaces: SelectWorkspace[]
};

const CreateYamDialog = ({ setShowYamDialog, loadingTxts, workspaces }: Props) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<SelectWorkspace>();
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState<string | null>(null);
  const [successBool, setSuccessBool] = useState(false);
  const [yamName, setYamName] = useState("");
  const [displayYamValue, setDisplayYamValue] = useState("");
  const router = useRouter()

  const togglePrivacy = (service: string) => {
    setPrivacy((prev) => (prev === service ? null : service));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!selectedWorkspace) return

    setSuccessBool(true);

    try {
      const res = await createYamAction({
        workspace: selectedWorkspace.name,
        workspaceId: selectedWorkspace.id,
        yam: yamName
      });

      console.log({res})
      router.push('/dashboard');
    } catch(e) {
      console.log(e)
      setSuccessBool(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update display value in lowercase while typing
    setDisplayYamValue(e.target.value.toLowerCase());
    setYamName(e.target.value.toLowerCase());
  };

  return (
    <div className="create-yam-dialog">
      <div className="background-opacity"></div>
      <div className="dialog-contain">
        <div className="close-btn" onClick={() => setShowYamDialog(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
          >
            <path
              d="M11.75 3.75L4.25 11.25M4.25 3.75L11.75 11.25"
              stroke="#E6E6E6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="yam-dialog-container">
          <form onSubmit={onSubmit}>
            {!successBool ? (
              <>
                <div className="head">
                  <h1>Create a Yam</h1>
                </div>
                <p>
                  Names must be in lowercase. They can between 3 and 45
                  characters long and may contain dashes.
                </p>

                <div className="form">
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Workspace</label>
                    </div>
                    <div className="right">
                      <div className="workspace-select">
                        <div
                          className="selected"
                          onClick={() => setOpen(!open)}
                        >
                          {selectedWorkspace?.name}
                          <span className="arrow">
                            <Image
                              src="/svgs/caret_down.svg"
                              alt=""
                              width={15}
                              height={15}
                            />
                          </span>
                        </div>

                        {open && (
                          <ul className="options">
                            {workspaces.map((workspace) => (
                              <li
                                key={workspace.id}
                                onClick={() => {
                                  setSelectedWorkspace(workspace);
                                  setOpen(false);
                                }}
                              >
                                {workspace.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Name</label>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="yamName"
                        placeholder="Enter yam’s name"
                        value={displayYamValue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Privacy</label>
                    </div>
                    <div className="right checkbox-right">
                      <div className="checkbox-container">
                        {["Private to me", "Share with team"].map(
                          (option, index) => (
                            <div
                              key={index}
                              className={`box  ${
                                privacy === option && "active"
                              }`}
                              onClick={() => togglePrivacy(option)}
                            >
                              <div className="containn">
                                <span> {option}</span>
                                <span className="hover-text"> {option}</span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="default-container">
                  <h3>default specs</h3>

                  <div className="default-contain">
                    <div className="default-row">
                      <h2>k3s version</h2>
                      <p>v1.20.0 + k3s1</p>
                    </div>
                    <div className="default-row">
                      <h2>Type</h2>
                      <p>K3s</p>
                    </div>
                    <div className="default-row">
                      <h2>Network</h2>
                      <p>Network</p>
                    </div>
                  </div>
                </div>

                <button type="submit">
                  <div className="contain">
                    <span>Create</span>
                    <span className="hover-text">Create</span>
                  </div>
                </button>
              </>
            ) : (
              <CreateAnimation
                successBool={successBool}
                loadingTxts={loadingTxts}
                title=" Your cloud environment is sprouting—built to scale, secure by
                  default, and made just for you."
              />
            )}
          </form>

          <div className="sample-container"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateYamDialog;
