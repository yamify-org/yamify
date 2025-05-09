import React from "react";
import AuthHeader from "../_components/AuthHeader";
import "@/styles/AuthPage.css";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="auth-section">
      <section>
        <AuthHeader />
        <div className="container">
          <h1>Create your account</h1>

          <div className="auth-btns">
            <div className="btn">
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
                <label htmlFor="">Password</label>
              </div>
              <div className="right">
                <div className="wrap">
                  <input
                    type="password"
                    name="password"
                    placeholder="Set your password"
                    required
                  />
                  <Image
                    src="/svgs/eyeopen.svg"
                    alt=""
                    height={15}
                    width={15}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
