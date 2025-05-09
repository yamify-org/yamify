import routes from "@/libs/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = () => {
  const lightMode = false;

  return (
    <header>
      <Link href="/" className="logo">
        <Image
          src={
            !lightMode
              ? "/svgs/yamify_logo_sm.svg"
              : "/svgs/yamify_logo_sm_lm.svg"
          }
          alt="Yamify Logo"
          className="logo-img"
          width={20}
          height={25.333}
        />
        <h1>Yamify</h1>
      </Link>

      <div className="wrap">
        <p>Already have an account?</p>
        <Link href={routes.auth.login}>Sign in</Link>
      </div>
    </header>
  );
};

export default AuthHeader;
