"use client";

import React, { useState } from "react";
import AuthHeader from "../../_components/AuthHeader";
import "@/styles/AuthPage.css";
import Image from "next/image";
import Link from "next/link";
import { OAuthStrategy } from '@clerk/types'
import { useSignIn } from '@clerk/nextjs'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useSignIn()

  if (!signIn) return null

  const signInWithSocial = (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/auth/sign-in/sso-callback',
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
          <h1>Sign in</h1>

          <div className="auth-btns">
            <div className="btn" onClick={() => signInWithSocial('oauth_github')}>
              <Image src="/svgs/mdi_github.svg" alt="" height={20} width={20} />
              Continue with GitHub
            </div>
            <div className="btn" onClick={() => signInWithSocial('oauth_github')}>
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