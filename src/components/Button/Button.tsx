import Link from "next/link";
import "@/styles/Button.css";

type Props = {
  linkBtn: boolean;
  yellow: boolean;
  text: string;
  href?: string;
  target?: string;
  submit?: boolean;
  onClick?: () => void;
};

const Button = ({
  linkBtn,
  yellow,
  text,
  href,
  target,
  onClick,
  submit,
}: Props) => {
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
        <button
          className={`btn ${yellow ? "yellow" : "green"}`}
          onClick={onClick}
          style={{ cursor: onClick ? "pointer" : "default" }}
          type={!submit ? "button" : "submit"}
        >
          <div className="contain">
            <span>{text}</span>
            <span className="hover-text">{text}</span>
          </div>
        </button>
      )}
    </>
  );
};

export default Button;
