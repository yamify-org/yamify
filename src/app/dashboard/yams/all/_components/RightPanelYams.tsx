import "@/styles/RightPanelDashboard.css";
import "@/styles/RightPanelDashboardYam.css";
import Image from "next/image";

type Props = {
  expandRightPanel: boolean;
  setShowYamDialog: (Callback: boolean) => void;
};

const yamData = [
  {
    name: "default yam",
    ip: "123.46.789.21",
    created: "just now",
    type: "GPU",
    gpus: "8 GPU / 2 TB",
    workspace: "marcus' workspace",
  },
  {
    name: "marcus's yam",
    ip: "987.65.432.10",
    created: "5 minutes ago",
    type: "GPU",
    gpus: "16 GPU / 4 TB",
    workspace: "marcus' workspace",
  },
];

const RightPanelYams = ({ expandRightPanel, setShowYamDialog }: Props) => {
  return (
    <div
      className={`right-panel right-panel-yams ${
        expandRightPanel && "not-expand"
      }`}
    >
      <div className="dummy-panel"></div>
      <div className="main-panel">
        <div className="header">
          <div className="wrap">
            <div className="notification">
              <Image
                src="/svgs/notification.svg"
                alt=""
                width={15}
                height={15}
              />
            </div>
            <div className="profile-contain">
              <Image
                src="/images/profile.jpg"
                alt=""
                width={768}
                height={552}
                className="profile-img"
              />
              <p>Marcus Otunba</p>
              <Image src="/svgs/caret_down.svg" alt="" width={15} height={15} />
            </div>
          </div>
        </div>

        <div className="section-yam">
          <nav>
            <div className="wrap">
              <Image alt="" src="/svgs/cluster.svg" width={24} height={24} />
              <h1>All Yams</h1>
            </div>

            <button onClick={() => setShowYamDialog(true)}>
              <span>
                <Image alt="" src="/svgs/cluster.svg" width={15} height={15} />
                Create a Yam
              </span>
              <Image alt="" src="/svgs/plus.svg" width={15} height={15} />
            </button>
          </nav>

          <div className="yam-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>IP Address</th>
                  <th>Created</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {yamData.map((yam, index) => (
                  <tr key={index}>
                    <td>
                      <div className="yam-name">
                        <span className="title-yam">
                          <Image
                            src="/svgs/cluster.svg"
                            alt="server"
                            width={15}
                            height={15}
                          />
                          <div className="title">{yam.name}</div>
                        </span>
                        <span className="meta">
                          {yam.gpus} • <span className="status">Active</span>{" "}
                          <span className="workspace">
                            <Image
                              src="/svgs/user.svg"
                              alt=""
                              height={15}
                              width={15}
                            />{" "}
                            {yam.workspace}
                          </span>
                          <span className="workspace">
                            <Image
                              src="/svgs/flag.svg"
                              alt=""
                              height={15}
                              width={15}
                            />
                            Nigeria Local Data Center
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="td">{yam.ip}</td>
                    <td className="td">{yam.created}</td>
                    <td className="td">{yam.type}</td>
                    <td>
                      <button className="action-btn">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanelYams;
