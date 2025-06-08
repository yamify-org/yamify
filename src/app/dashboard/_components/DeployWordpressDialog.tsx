import React, { useState, useEffect } from "react";
import "@/styles/DeployWordpressDialog.css";
import Image from "next/image";
import CreateAnimation from "@/components/CreateAnimation";
import { deployWordpressProjectAction } from "../_actions";
import { SelectWorkspace, SelectYam } from "@/types/server";
import { useRouter } from "next/navigation";
import fetchYams from "@/libs/queries/fetch-yams";

type Props = {
  setShowWordpressDialog: (Callback: boolean) => void;
  loadingTxts: string[];
  workspaces: SelectWorkspace[];
  selectedWorkspace?: SelectWorkspace;
  selectedYam?: SelectYam;
};

const DeployWordpressDialog = ({
  setShowWordpressDialog,
  loadingTxts,
  workspaces,
  selectedWorkspace: initialWorkspace,
  selectedYam: initialYam
}: Props) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<SelectWorkspace>(initialWorkspace || workspaces[0]);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [yams, setYams] = useState<SelectYam[]>([]);
  const [selectedYam, setSelectedYam] = useState<SelectYam | null>(initialYam ? initialYam : null);
  const [yamOpen, setYamOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successBool, setSuccessBool] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [displayProjectValue, setDisplayProjectValue] = useState("");
  const [deploymentResult, setDeploymentResult] = useState<{
    url?: string;
    username?: string;
    password?: string;
  } | null>(null);
  const router = useRouter();

  // Fetch yams when workspace changes (only if no initial yam was provided)
  useEffect(() => {
    if (selectedWorkspace && !initialYam) {
      setLoading(true);
      fetchYams({ workspaceId: selectedWorkspace.id })
        .then(data => {
          setYams(data);
          setSelectedYam(data.length > 0 ? data[0] : null);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch yams:", err);
          setYams([]);
          setSelectedYam(null);
          setLoading(false);
        });
    }
  }, [selectedWorkspace, initialYam]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWorkspace || !selectedYam) return;

    setSuccessBool(true);

    try {
      const res = await deployWordpressProjectAction({
        name: projectName,
        namespace: selectedWorkspace.name,
        yamId: selectedYam.id,
        workspaceId: selectedWorkspace.id
      });

      console.log({ res });
      
      console.log("Résultat du déploiement:", res);
      
      if (res.success && res.project) {
        console.log("Projet déployé avec succès:", res.project);
        
        // Forcer les valeurs par défaut si les propriétés sont manquantes
        const deploymentInfo = {
          url: res.project.url || `https://${selectedWorkspace.name}-wordpress.aiscaler.ai`,
          username: res.project.username || 'user',
          password: res.project.password || 'password'
        };
        
        console.log("Informations de déploiement:", deploymentInfo);
        
        // Stocker les informations de déploiement
        setDeploymentResult(deploymentInfo);
      } else {
        // En cas d'échec, afficher un message d'erreur
        alert("Échec du déploiement: " + (res.error || "Erreur inconnue"));
        setSuccessBool(false);
      }
    } catch (e) {
      console.log(e);
      setSuccessBool(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update display value in lowercase while typing
    setDisplayProjectValue(e.target.value.toLowerCase());
    setProjectName(e.target.value.toLowerCase());
  };

  return (
    <div className="deploy-wordpress-dialog">
      <div className="background-opacity"></div>
      <div className="dialog-contain">
        <div className="close-btn" onClick={() => setShowWordpressDialog(false)}>
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

        <div className="wordpress-dialog-container">
          <form onSubmit={onSubmit}>
            {!successBool ? (
              <>
                <div className="head">
                  <h1>Deploy WordPress</h1>
                </div>
                <p>
                  Deploy a WordPress site in one click. Your site will be accessible via a secure URL.
                </p>

                <div className="form">
                  {!initialYam && (
                    <>
                      <div className="label">
                        <div className="left">
                          <label htmlFor="">Workspace</label>
                        </div>
                        <div className="right">
                          <div className="workspace-select">
                            <div
                              className="selected"
                              onClick={() => setWorkspaceOpen(!workspaceOpen)}
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

                            {workspaceOpen && (
                              <ul className="options">
                                {workspaces.map((workspace) => (
                                  <li
                                    key={workspace.id}
                                    onClick={() => {
                                      setSelectedWorkspace(workspace);
                                      setWorkspaceOpen(false);
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
                          <label htmlFor="">Yam (Cluster)</label>
                        </div>
                        <div className="right">
                          <div className="workspace-select">
                            <div
                              className="selected"
                              onClick={() => setYamOpen(!yamOpen)}
                            >
                              {loading ? "Loading..." : selectedYam?.name || "No yams available"}
                              <span className="arrow">
                                <Image
                                  src="/svgs/caret_down.svg"
                                  alt=""
                                  width={15}
                                  height={15}
                                />
                              </span>
                            </div>

                            {yamOpen && yams.length > 0 && (
                              <ul className="options">
                                {yams.map((yam) => (
                                  <li
                                    key={yam.id}
                                    onClick={() => {
                                      setSelectedYam(yam);
                                      setYamOpen(false);
                                    }}
                                  >
                                    {yam.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {initialYam && (
                    <div className="label">
                      <div className="left">
                        <label htmlFor="">Deploying to</label>
                      </div>
                      <div className="right">
                        <div className="selected-info">
                          <Image
                            src="/svgs/cluster.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                          <span>{initialYam.name}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">Site Name</label>
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="projectName"
                        placeholder="Enter site name"
                        value={displayProjectValue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="default-container">
                  <h3>WordPress Configuration</h3>

                  <div className="default-contain">
                    <div className="default-row">
                      <h2>Username</h2>
                      <p>user</p>
                    </div>
                    <div className="default-row">
                      <h2>Password</h2>
                      <p>password</p>
                    </div>
                    <div className="default-row">
                      <h2>Database</h2>
                      <p>MariaDB (included)</p>
                    </div>
                  </div>
                </div>

                <button type="submit">
                  <div className="contain">
                    <span>Deploy WordPress</span>
                    <span className="hover-text">Deploy WordPress</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* Afficher toujours les informations de déploiement après un court délai */}
                {!deploymentResult ? (
                  <CreateAnimation
                    successBool={successBool}
                    loadingTxts={loadingTxts}
                    title="Your WordPress site is being deployed. It will be ready in a few minutes."
                  />
                ) : (
                  <div className="deployment-success">
                    <div className="success-icon">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="32" fill="#00A67E" fillOpacity="0.1"/>
                        <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" fill="#00A67E" fillOpacity="0.1"/>
                        <path d="M24 32L29 37L40 26" stroke="#00A67E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2>WordPress Deployed Successfully!</h2>
                    <p>Your WordPress site is being configured. It may take a few minutes to be fully accessible. Use the information below to access it once ready.</p>
                    
                    <div className="connection-info">
                      <div className="info-row">
                        <span className="label">Site URL:</span>
                        <div className="value-with-copy">
                          <a href={deploymentResult.url} target="_blank" rel="noopener noreferrer">
                            {deploymentResult.url}
                          </a>
                          <button
                            className="copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(deploymentResult.url || '');
                            }}
                          >
                            <Image src="/svgs/copy.svg" alt="Copy" width={15} height={15} />
                          </button>
                        </div>
                      </div>
                      <div className="info-row">
                        <span className="label">Username:</span>
                        <div className="value-with-copy">
                          <span>{deploymentResult.username}</span>
                          <button
                            className="copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(deploymentResult.username || '');
                            }}
                          >
                            <Image src="/svgs/copy.svg" alt="Copy" width={15} height={15} />
                          </button>
                        </div>
                      </div>
                      <div className="info-row">
                        <span className="label">Password:</span>
                        <div className="value-with-copy">
                          <span>{deploymentResult.password}</span>
                          <button
                            className="copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(deploymentResult.password || '');
                            }}
                          >
                            <Image src="/svgs/copy.svg" alt="Copy" width={15} height={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="action-buttons">
                      <a
                        href={deploymentResult.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-btn"
                      >
                        Open WordPress Site
                      </a>
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setShowWordpressDialog(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeployWordpressDialog;