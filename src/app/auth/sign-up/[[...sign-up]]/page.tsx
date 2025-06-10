"use client";

import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../../_components/AuthHeader";
import "@/styles/AuthPage.css";
import Image from "next/image";
import { countries } from "@/utils/data";

import { OAuthStrategy } from '@clerk/types'
import { useSignUp } from '@clerk/nextjs'

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
  const { signUp } = useSignUp()

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

  if (!signUp) return null

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const signUpWithSocial = (strategy: OAuthStrategy) => {
    return signUp
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/auth/sign-up/sso-callback',
        redirectUrlComplete: '/dashboard',
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors)
        console.error(err, null, 2)
      })
  }

  return (
    <div className="auth-section">
      <section>
        <AuthHeader />
        <div className="container">
          <h1>Create your account</h1>

          <div className="auth-btns">
            <div className="btn" onClick={() => signUpWithSocial('oauth_github')}>
              <Image src="/svgs/mdi_github.svg" alt="" height={20} width={20} />
              Continue with GitHub
            </div>
            <div className="btn" onClick={() => signUpWithSocial('oauth_google')}>
              <Image src="/svgs/google.svg" alt="" height={20} width={20} />
              Continue with Google
            </div>
          </div>

          {/* <div className="line-wrap">
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
          </form> */}

          <div className="txt">
            By signing up, you agree to our <span>Privacy Policy</span> and{" "}
            <span>Terms of Use</span>
          </div>
        </div>
      </section>
    </div>
  );
}