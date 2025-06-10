import Link from "next/link";
import "@/styles/Button.css";

type Props = {
  linkBtn: boolean;
  yellow: boolean;
  text: string;
  href?: string;
  target?: string;
  onClick?: () => void;
};

const Button = ({ linkBtn, yellow, text, href, target, onClick }: Props) => {
  return (
    <>
      {linkBtn && href ? (
        <Link
          target={target}
          href={href}
          className={`btn ${yellow ? "yellow" : "green"}`}
        >
          <div className="contain">
            <span>{text}</span>
            <span className="hover-text">{text}</span>
          </div>
        </Link>
      ) : (
        <div
          className={`btn ${yellow ? "yellow" : "green"}`}
          onClick={onClick}
          style={{ cursor: onClick ? "pointer" : "default" }}
        >
          <div className="contain">
            <span>{text}</span>
            <span className="hover-text">{text}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Button;
