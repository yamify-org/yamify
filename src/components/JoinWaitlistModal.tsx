import React from "react";
import "@/styles/JoinWaitlistModal.css";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  joinWaitlistModal: boolean;
};

const JoinWaitlistModal = ({
  setJoinWaitlistModal,
  joinWaitlistModal,
}: Props) => {
  return (
    <div className="join-waitlist-modal">
      <AnimatePresence>
        {joinWaitlistModal && (
          <motion.form
            key="modal"
            className="join-waitlist-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/svgs/close.svg"
              alt="Close"
              className="close"
              width={20}
              height={20}
              onClick={() => setJoinWaitlistModal(false)}
            />
            <h1>Be the First to Build the Future.</h1>
            <p>
              We’re opening early access to students/learners, developers,
              startups, and creators who want to be part of the next evolution
              in cloud infrastructure — powered by AI, built for Africa, and
              open to the world. Whether you’re launching an MVP, deploying
              full-scale apps, or experimenting with AI workloads, this platform
              adapts to your needs.
            </p>
            <div className="container">
              <div className="label">
                <div className="left">
                  <label htmlFor="">Name</label>
                </div>
                <div className="right">
                  <input
                    type="text"
                    name="name"
                    placeholder="So we know who’s building with us."
                    required
                  />
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">Email</label>
                </div>
                <div className="right">
                  <input
                    type="email"
                    name="email"
                    placeholder="We’ll send your access link and insider updates here."
                    required
                  />
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">?Where are you based</label>
                </div>
                <div className="right">
                  <input
                    type="text"
                    name="location"
                    placeholder="We’re optimizing experiences regionally — your location helps."
                    required
                  />
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">?What best describes you</label>
                </div>
                <div className="right">
                  <div className="checkbox-container">
                    {[
                      "Student/Learner",
                      "Frontend Developer",
                      "WordPress Developer",
                      "Startup Founder",
                      "Backend Developer",
                      "DevOps/Cloud Engineer",
                      "Freelancer/Agency",
                    ].map((option, index) => (
                      <div key={index} className="box">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    Do you use GitHub, GitLab, or any
                    <br /> ?CI/CD tools
                  </label>
                </div>
                <div className="right">
                  <div className="checkbox-container">
                    <div className="box">Yes</div>
                    <div className="box">No</div>
                  </div>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    Would you like to test Yamify and
                    <br /> ?share feedback
                  </label>
                </div>
                <div className="right">
                  <div className="checkbox-container">
                    {["Yes", "Not sure yet", "Only interested for now"].map(
                      (option, index) => (
                        <div key={index} className="box">
                          {option}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    How soon are you launching your
                    <br /> ?project
                  </label>
                </div>
                <div className="right">
                  <div className="checkbox-container">
                    {[
                      "This week",
                      "In 1 - 2 weeks",
                      "In a month",
                      "Just exploring",
                    ].map((option, index) => (
                      <div key={index} className="box">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    What tools/platforms are you using
                    <br /> ?currently
                  </label>
                </div>
                <div className="right">
                  <textarea
                    name="tools"
                    id=""
                    style={{ height: 100 }}
                    placeholder="Free text field—make this personal, not formal"
                  ></textarea>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    Any specific feature you wish we
                    <br /> ?had
                  </label>
                </div>
                <div className="right">
                  <textarea
                    name="tools"
                    id=""
                    style={{ height: 100 }}
                    placeholder="Free text field—make this personal, not formal"
                  ></textarea>
                </div>
              </div>
              <div className="label">
                <div className="left">
                  <label htmlFor="">
                    What’s your biggest struggle with
                    <br /> ?deploying apps today
                  </label>
                </div>
                <div className="right">
                  <textarea
                    name="tools"
                    id=""
                    style={{ height: 100 }}
                    placeholder="Free text field—make this personal, not formal"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="contain">
              <button type="submit">Submit</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinWaitlistModal;
