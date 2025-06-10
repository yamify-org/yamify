import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import { deployCodeServerProjectAction, deployWordpressProjectAction } from "@/app/dashboard/_actions/index";
import fetchYam from "@/libs/queries/fetch-yam";
import "@/styles/RightPanelDashboard.css";
import "@/styles/RightPanelDashboardYamPage.css";
import { SelectYam } from "@/types/server";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  expandRightPanel: boolean;
};

// const yamData = [
//   {
//     name: "default yam",
//     ip: "123.46.789.21",
//     created: "just now",
//     type: "GPU",
//     gpus: "8 GPU / 2 TB",
//     workspace: "marcus' workspace",
//   },
//   {
//     name: "marcus's yam",
//     ip: "987.65.432.10",
//     created: "5 minutes ago",
//     type: "GPU",
//     gpus: "16 GPU / 4 TB",
//     workspace: "marcus' workspace",
//   },
// ];

// interface Yam {
//   name: string;
//   ip: string;
//   created: string;
//   type: string;
//   gpus: string;
//   workspace: string;
// }

const RightPanelYam = ({ expandRightPanel }: Props) => {
  const [yam, setYam] = useState<SelectYam>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Add this state for deployment loading (add after existing useState declarations)
  const [deploymentLoading, setDeploymentLoading] = useState<{
    wordpress: boolean;
    codeserver: boolean;
  }>({
    wordpress: false,
    codeserver: false
  });

  const params = useParams();
  const yamName = params.name as string;

  const slug = decodeURIComponent(yamName);

  useEffect(() => {
    async function getWorkspaces() {
      setLoading(true)
      try {
        const data = await fetchYam({
          name: slug
        });
        setYam(data);
        setLoading(false)
      } catch (err) {
        console.error(err);
        setError('Could not load yam. Please try again later.');
        setLoading(false)
      }
    }
    getWorkspaces();
  }, [slug]);

  console.log(error);

  if(!yam) {
    return null;
  }

  const handleDownloadKubeconfig = () => {
    if (!yam?.kubeConfig) {
      alert("No kubeconfig available");
      return;
    }

    const blob = new Blob([yam.kubeConfig], { type: "application/x-yaml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${yam.name}-kubeconfig.yaml`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDeployWordPress = async () => {
  if (!yam) return;
  
  setDeploymentLoading(prev => ({ ...prev, wordpress: true }));
  
  try {
    const result = await deployWordpressProjectAction({
      name: `wordpress-${Date.now()}`,
      namespace: `${yam.namespace}-wordpress`,
      yamId: yam.id,
      workspaceId: yam.workspaceId
    });
    
    if (result.success) {
      alert("WordPress deployment created successfully!");
    } else {
      alert(result.error || "Failed to deploy WordPress");
    }
  } catch (error) {
    console.error("Failed to deploy WordPress:", error);
    alert("Failed to deploy WordPress. Please try again.");
  } finally {
    setDeploymentLoading(prev => ({ ...prev, wordpress: false }));
  }
};

const handleDeployCodeServer = async () => {
  if (!yam) return;
  
  setDeploymentLoading(prev => ({ ...prev, codeserver: true }));
  
  try {
    const result = await deployCodeServerProjectAction({
      name: `codeserver-${Date.now()}`,
      namespace: yam.namespace,
      yamId: yam.id,
      workspaceId: yam.workspaceId
    });
    
    if (result.success) {
      alert("CodeServer deployment created successfully!");
    } else {
      alert(result.error || "Failed to deploy CodeServer");
    }
  } catch (error) {
    console.error("Failed to deploy CodeServer:", error);
    alert("Failed to deploy CodeServer. Please try again.");
  } finally {
    setDeploymentLoading(prev => ({ ...prev, codeserver: false }));
  }
};

  return (
    <div
      className={`right-panel right-panel-yams ${
        expandRightPanel && "not-expand"
      }`}
    >
      <div className="dummy-panel"></div>
      <div className="main-panel">
        <DashboardHeader />

        {!loading && 
          <div className="section-yam">
            <nav>
              <div className="wrap">
                <Image alt="" src="/svgs/cluster.svg" width={24} height={24} />
                <h1>{yam.name}</h1>
              </div>

              <div className="contain-info">
                <span className="meta">
                  <span className="workspace">
                    <Image src="/svgs/user.svg" alt="" height={15} width={15} />{" "}
                    {yam.namespace}
                  </span>
                  <span className="workspace">
                    <Image src="/svgs/flag.svg" alt="" height={15} width={15} />
                    Nigeria Local Data Center
                  </span>
                </span>
              </div>
            </nav>

            <div className="tab-container">
              <div className="tab active">
                <h2>Overview</h2>
              </div>
              <div className="tab">
                <h2>Installed Apps</h2>
              </div>
              <div className="tab">
                <h2>Project</h2>
              </div>
              <div className="tab">
                <h2>Usage</h2>
              </div>
            </div>

            <div className="yam-details">
              <div className="left">
                <h3>Yam details</h3>
                <div className="card">
                  <div className="row">
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Name</h4>
                        <p>{yam.name}</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Type</h4>
                        <p>K3s</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>k3s version</h4>
                        <p>v1.20.0 + k3s1</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Size</h4>
                        <p>16 GPU / 4 TB</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Network</h4>
                        <p>Default</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Firewall</h4>
                        <p>Default (all open)</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content" style={{cursor: "pointer"}} onClick={handleDownloadKubeconfig}>
                        <h4>Kubeconfig</h4>
                        <p style={{ color: "#DD9A38" }}>Click to download</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Namespace</h4>
                        <p>{yam.namespace}</p>
                      </div>
                    </div>
                    <div className="contain">
                      <div className="txt-content">
                        <h4>Created</h4>
                        <p>{new Date(yam.createdAt).toDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h3>Connection details</h3>
                <div className="card">
                  <div className="row">
                    <div className="txt-content">
                      <h4>Public IPv4</h4>
                      <p>123.46.789.21</p>
                    </div>

                    <Image src="/svgs/copy.svg" alt="" height={15} width={15} />
                  </div>
                  <div className="row">
                    <div className="txt-content">
                      <h4>Private IP</h4>
                      <p>123.46.789.21</p>
                    </div>

                    <Image src="/svgs/copy.svg" alt="" height={15} width={15} />
                  </div>
                </div>
              </div>
            </div>

            <div className="yam-usage">
              <h3>Usage</h3>

              <div className="card">
                <div className="row">
                  <div className="contain">
                    <div className="txt-content">
                      <p>Pods</p>
                      <div className="reader-container">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                      </div>
                      <div className="txt">0/300</div>
                      <div className="percentage">0%</div>
                    </div>
                  </div>
                  <div className="contain same">
                    <div className="txt-content">
                      <p>Core</p>
                      <div className="reader-container">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                      </div>
                      <div className="txt">0/1</div>
                      <div className="percentage">0%</div>
                    </div>
                  </div>
                  <div className="contain same">
                    <div className="txt-content">
                      <p>Memory</p>
                      <div className="reader-container">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                      </div>
                      <div className="txt">200 mb / 1.0 TB</div>
                      <div className="percentage">0%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="deploy-project">
              <h3>Projects</h3>

              <div className="card">
                <h4>No deployed project</h4>
                <p>Once you deploy a project, you can access it here.</p>
                <button 
                  onClick={handleDeployWordPress}
                  disabled={deploymentLoading.wordpress}
                >
                  {deploymentLoading.wordpress ? "Deploying..." : "Deploy a wordpress project"}
                </button>
                <button 
                  onClick={handleDeployCodeServer}
                  disabled={deploymentLoading.codeserver}
                >
                  {deploymentLoading.codeserver ? "Deploying..." : "Deploy a codeserver project"}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default RightPanelYam;
