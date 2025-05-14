"use client";

import React, { useEffect, useState } from "react";
import AuthHeader from "../_components/AuthHeader";
import "@/styles/AuthPage.css";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  // useEffect hook example
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "https://yamify-backend.onrender.com/api/v1/user/me",
          {
            method: "GET",
            credentials: "include", // important! sends cookies
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        console.log("User data:", data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  const handleGitHubLogin = () => {
    const githubAuthUrl =
      "https://yamify-backend.onrender.com/api/v1/auth/github";
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="auth-section">
      <section>
        <AuthHeader />
        <div className="container">
          <h1>Sign in</h1>

          <div className="auth-btns">
            <div className="btn" onClick={handleGitHubLogin}>
              <Image src="/svgs/mdi_github.svg" alt="" height={20} width={20} />
              Continue with GitHub
            </div>
            <div className="btn">
              <Image src="/svgs/google.svg" alt="" height={20} width={20} />
              Continue with Google
            </div>
          </div>

          <div className="line-wrap">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>

          <form action="">
            <div className="label">
              <div className="left">
                <label htmlFor="">Email address</label>
              </div>
              <div className="right">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="label">
              <div className="left">
                <label htmlFor="password">Password</label>
              </div>
              <div className="right">
                <div className="wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <Image
                    onClick={() => setShowPassword((prev) => !prev)}
                    src={
                      showPassword ? "/svgs/eyeopen.svg" : "/svgs/eyeopen.svg"
                    }
                    alt="Toggle password visibility"
                    height={15}
                    width={15}
                  />
                </div>
              </div>
            </div>

            <button type="submit">
              <div className="contain">
                <span>Sign in</span>
                <span className="hover-text">Sign in</span>
              </div>
            </button>
          </form>

          <div className="txt">
            Forgot your password?{" "}
            <span>
              <Link href="">Reset it</Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
