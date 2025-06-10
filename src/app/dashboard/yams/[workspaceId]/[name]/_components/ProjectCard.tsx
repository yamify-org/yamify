import Image from "next/image";
import Link from "next/link";
import { tag } from "@/utils/tags";
import { groups } from "@/utils/data";
import { Project } from "@prisma/client";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => (
  <div className="project">
    <div className="contain-head">
      <div className="txt">
        <Image
          src={`/svgs/${project.type}.svg`}
          alt=""
          width={15}
          height={15}
        />
        <p>{project.name}</p>
      </div>
    </div>

    <div className="deploy-details">
      <div className="wrap">
        <div className="ctn">deployments</div>
        <div className="ctn">
          {/* Replace with actual time if available */}
          {project.createdAt ? `${Math.floor((Date.now() - new Date(project.createdAt).getTime()) / 60000)} mins ago` : ""}
        </div>
        <div className="app">
          <Image
            src={`/svgs/${project.type}.svg`}
            alt=""
            width={15}
            height={15}
          />
          <p>{project.type}</p>
        </div>
      </div>
      <div className="status">{project.status}</div>
    </div>

    <div className="group-ctn">
      {tag.icon({
        color: groups[0].color,
        width: 15,
        height: 15,
      })}
      <p>{project.namespace}</p>
    </div>

    <div className="project-links">
      {project.url && (
        <Link href={project.url} target="_blank">
          {project.url}
        </Link>
      )}
    </div>

    <div className="project-links">
      {project.username && (
        <Link href="/#">Default username: {project.username}</Link>
      )}
    </div>
    <div className="project-links">
      {project.password && (
        <Link href="/#">Default password: {project.password}</Link>
      )}
    </div>
  </div>
);

export default ProjectCard;