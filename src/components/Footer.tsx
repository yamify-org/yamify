import React from "react";
import "@/styles/Footer.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <section>
        <div className="container">
          <div className="left">
            <h2>Navigations</h2>
            <Image
              src="/svgs/top_left_corner_pin.svg"
              className="pin bottom-left"
              alt=""
              width={21}
              height={21}
            />
            <Image
              src="/svgs/top_left_corner_pin.svg"
              className="pin bottom-right"
              alt=""
              width={21}
              height={21}
            />
            <Image
              src="/svgs/top_right_corner_pin.svg"
              className="pin top-right"
              alt=""
              width={21}
              height={21}
            />

            <div className="links">
              <div className="nav-link">Home</div>
              <div className="nav-link">What if</div>
              <div className="nav-link">Capabilities</div>
              <div className="nav-link">Yamify Layers</div>
              <div className="nav-link">For Developers</div>
              <div className="nav-link">Join WaitList</div>
            </div>
          </div>
          <div className="right">
            <Image
              src="/svgs/top_right_corner_pin.svg"
              className="pin top-right"
              alt=""
              width={21}
              height={21}
            />

            <div className="socials">
              <Link href="#" target="_blank">
                <Image src="/svgs/Facebook.svg" alt="" width={20} height={20} />
              </Link>
              <Link href="#" target="_blank">
                <Image src="/svgs/Github.svg" alt="" width={20} height={20} />
              </Link>
              <Link href="#" target="_blank">
                <Image src="/svgs/Linkedin.svg" alt="" width={20} height={20} />
              </Link>
            </div>

            <div className="contact-info">
              <h3>Contact</h3>
              <a className="txt" href="tel:++1 994 345 232">
                +1 994 345 232
              </a>
              <p className="txt">
                Silicon Valley, San Francisco, United State.
              </p>
            </div>
          </div>
        </div>

        <div className="bottom">
          <Image
            src="/svgs/yamify_logo_lg.svg"
            alt="yamify logo"
            className="logo"
            width={30}
            height={38}
          />

          <p>
            Yamify is Africa’s first sovereign cloud infrastructure platform,
            built to empower developers, startups, and enterprises with instant
            access to secure, scalable resources.{" "}
          </p>

          <Image
            className="end"
            src="/svgs/yamify_gd.svg"
            alt=""
            width={797}
            height={306}
          />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
