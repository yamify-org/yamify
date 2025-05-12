"use client";

import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../_components/AuthHeader";
import "@/styles/AuthPage.css";
import Image from "next/image";
import { countries } from "@/utils/data";
// import { useRouter } from "next/navigation";

export default function SignUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState({
    name: "Nigeria",
    dialCode: "+234",
    code: "NG",
    flag: "https://flagcdn.com/ng.svg",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const router = useRouter();

  // useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     if (event.origin !== window.location.origin) return;

  //     if (event.data.type === "github-auth-success") {
  //       router.push("/dashboard");
  //     } else if (event.data.type === "github-auth-error") {
  //       console.error("GitHub auth error:", event.data.error);
  //       alert("GitHub authentication failed. Please try again.");
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, [router]);

  // const initiateGitHubOAuth = () => {
  //   // const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
  //   const clientId = "Ov23li0xw0wSK8MpIurj";
  //   const redirectUri = `${window.location.origin}/auth/github/callback`;
  //   const scope = "user:email";

  //   const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri
  //   )}&scope=${encodeURIComponent(scope)}`;

  //   const width = 600;
  //   const height = 600;
  //   const left = (window.innerWidth - width) / 2;
  //   const top = (window.innerHeight - height) / 2;

  //   const popup = window.open(
  //     githubAuthUrl,
  //     "GitHub OAuth",
  //     `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
  //   );

  //   if (!popup || popup.closed || typeof popup.closed === "undefined") {
  //     alert(
  //       "Popup blocked! Please allow popups for this site to continue with GitHub login."
  //     );
  //     return;
  //   }

  //   const checkPopup = setInterval(() => {
  //     if (popup.closed) {
  //       clearInterval(checkPopup);
  //     }
  //   }, 500);
  // };

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
          <h1>Create your account</h1>

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
                <label htmlFor="">Country</label>
              </div>
              <div className="right">
                <div className="input-wrap" onClick={() => setIsOpen(!isOpen)}>
                  <div className="phone-btn">
                    <Image
                      src={country.flag}
                      alt=""
                      width={100}
                      height={100}
                      className="flag"
                    />
                    {/* <div className="code">{country.dialCode}</div> */}
                    <div className="country-txt">{country.name}</div>
                  </div>

                  <div className="caret-contain">
                    <Image
                      src="/svgs/caret_down.svg"
                      alt=""
                      height={15}
                      width={15}
                    />
                  </div>

                  {isOpen && (
                    <div className="modal-overlay" ref={modalRef}>
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />

                      {filteredCountries.map((country, index) => (
                        <div
                          className="country-item"
                          key={index}
                          onClick={() => {
                            setCountry(country);
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <div className="wrap">
                            <Image
                              src={country.flag}
                              alt=""
                              width={100}
                              height={100}
                              className="flag"
                            />
                            <div className="name">{country.name}</div>
                          </div>
                          <span className="code">{country.dialCode}</span>
                        </div>
                      ))}
                    </div>
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
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
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
                    placeholder="Set your password"
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
                <span>Create</span>
                <span className="hover-text">Create</span>
              </div>
            </button>
          </form>

          <div className="txt">
            By signing up, you agree to our <span>Privacy Policy</span> and{" "}
            <span>Terms of Use</span>
          </div>
        </div>
      </section>
    </div>
  );
}
