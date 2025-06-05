import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import routes from "@/libs/routes";
import "@/styles/RightPanelDashboard.css";
import "@/styles/RightPanelDashboardProject.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
  expandRightPanel: boolean;
};

const RightPanelProjects = ({ expandRightPanel }: Props) => {
  return (
    <div
      className={`right-panel right-panel-yams ${
        expandRightPanel && "not-expand"
      }`}
    >
      <div className="dummy-panel"></div>
      <div className="main-panel">
        <DashboardHeader />

        <div className="section-projects">
          <nav>
            <div className="wrap">
              <Image alt="" src="/svgs/workflow.svg" width={24} height={24} />
              <h1>All Projects</h1>
            </div>

            {/* <button onClick={() => setShowYamDialog(true)}>
              <span>
                <Image alt="" src="/svgs/cluster.svg" width={15} height={15} />
                Create a Yam
              </span>
              <Image alt="" src="/svgs/plus.svg" width={15} height={15} />
            </button> */}
          </nav>

          <div className="deploy-container">
            <h2>No deployed project</h2>
            <p>
              Deploy your first application to get started with your Kubernetes
              environment. Once you deploy a project, you can access it here.
            </p>
            <Link href={routes.dashboard.projects.deployProject}>
              Deploy a project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanelProjects;
