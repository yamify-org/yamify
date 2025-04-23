"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import "@/styles/Header.css";

const Header = () => {
  return (
    <header>
      <section>
        <Link href="/" className="logo">
          <Image
            src="/svgs/yamify_logo_sm.svg"
            alt="Yamify Logo"
            width={20}
            height={25.333}
          />
          <h1>Yamify</h1>
        </Link>

        <nav>
          <Link href="#" className="wrapped-link">
            <span className="wrap">
              Products
              <Image
                src="/svgs/chevron_down.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>

            <span className="hover-text wrap">
              Products
              <Image
                src="/svgs/chevron_down.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>
          </Link>

          <Link href="#">
            <span>Pricing</span>
            <span className="hover-text">Pricing</span>
          </Link>
          <Link href="#">
            <span>Resources</span>
            <span className="hover-text">Resources</span>
          </Link>
          <Link href="#">
            <span>Support</span>
            <span className="hover-text">Support</span>
          </Link>
        </nav>

        <div className="action-btns">
          <div className="modes">
            <div className="btn-mode light">
              <Image src="/svgs/sun.svg" alt="" width={15} height={15} />
            </div>
            <div className="btn-mode dark">
              <Image src="/svgs/moon.svg" alt="" width={15} height={15} />
            </div>
          </div>

          <Link href="#" className="btn yellow">
            <div className="contain">
              <span>Join WaitList</span>
              <span className="hover-text">Join WaitList</span>
            </div>
          </Link>

          <Link href="#" className="btn green">
            <div className="contain">
              <span>Contact</span>
              <span className="hover-text">Contact</span>
            </div>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
