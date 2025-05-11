import React, { useEffect, useState } from "react";
import "@/styles/JoinWaitlistModal.css";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import LoadingAnimation from "./LoadingAnimation";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  setJoinWaitlistModal: (value: boolean) => void;
  joinWaitlistModal: boolean;
  lightMode: boolean;
};

const JoinWaitlistModal = ({
  setJoinWaitlistModal,
  joinWaitlistModal,
  lightMode,
}: Props) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [useGitHub, setUseGitHub] = useState<string | null>(null);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);
  const [launchingRange, setLaunchingRange] = useState<string | null>(null);
  const [loadingBool, setLoadingBool] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    tools: "",
    specificFeature: "",
    biggestStruggle: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    // Run the function once to set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { name, email, location, tools, specificFeature, biggestStruggle } =
    formData;

  const toggleRoles = (service: string) => {
    setSelectedRoles((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const toggleGitgub = (service: string) => {
    setUseGitHub((prev) => (prev === service ? null : service));
  };

  const toggleTestFeedback = (service: string) => {
    setTestFeedback((prev) => (prev === service ? null : service));
  };

  const toggleLaunchingRange = (service: string) => {
    setLaunchingRange((prev) => (prev === service ? null : service));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyTcfdPAztHinnin4edSV2cf0WpN5tUhXO1WWz95syvwp9NCHM9FiYFkKSEPwllOTGY/exec";

    const formData = {
      name,
      email,
      location,
      tools,
      specific_feature: specificFeature,
      biggest_struggle: biggestStruggle,
      selected_roles: selectedRoles,
      use_github: useGitHub,
      test_feedback: testFeedback,
      launching_range: launchingRange,
    };

    setLoadingBool(true);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // ADD THIS !!!
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "updated" || data.status === "new entry added") {
        setSuccessModal(true);
      } else {
        showErrorToast();
      }
    } catch (err) {
      console.error(err);
      showErrorToast();
    } finally {
      setLoadingBool(false);
    }
  };

  const showErrorToast = () => {
    toast.error("Something went wrong on our end. Please try again later. 🔄", {
      position: "top-center",
      transition: Slide,
      autoClose: 4000,
      hideProgressBar: false, // Show progress bar
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      style: {
        background: "rgba(255, 45, 85, 0.85)",
        backdropFilter: "blur(20px)",
        color: "#fff",
        borderRadius: "16px",
        fontWeight: "600",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        letterSpacing: "0.3px",
        padding: "14px 20px",
        boxShadow: "0px 12px 35px rgba(255, 45, 85, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        overflow: "hidden",
      },
    });
  };

  return (
    <div className={`join-waitlist-modal ${lightMode && "light-mode"}`}>
      <AnimatePresence>
        {joinWaitlistModal && (
          <motion.form
            key="modal"
            className="join-waitlist-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            onSubmit={onSubmit}
          >
            <Image
              src="/svgs/close.svg"
              alt="Close"
              className="close"
              width={20}
              height={20}
              onClick={() => {
                setJoinWaitlistModal(false);
                setSuccessModal(false);
              }}
            />
            {!successModal ? (
              <>
                <h1>Be the First to Build the Future.</h1>
                <p>
                  We’re opening early access to students/learners, developers,
                  startups, and creators who want to be part of the next
                  evolution in cloud infrastructure — powered by AI, built for
                  Africa, and open to the world. Whether you’re launching an
                  MVP, deploying full-scale apps, or experimenting with AI
                  workloads, this platform adapts to your needs.
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
                        value={name}
                        onChange={handleChange}
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
                        value={email}
                        onChange={handleChange}
                        placeholder="We’ll send your access link and insider updates here."
                        required
                      />
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      {!isMobile ? (
                        <label htmlFor="">?Where are you based</label>
                      ) : (
                        <label htmlFor="">
                          Where are you
                          <br />
                          ?based
                        </label>
                      )}
                    </div>
                    <div className="right">
                      <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                        placeholder="We’re optimizing experiences regionally — your location helps."
                        required
                      />
                    </div>
                  </div>
                  <div className="label">
                    <div className="left">
                      <label htmlFor="">
                        {!isMobile ? (
                          <label htmlFor="">?What best describes you</label>
                        ) : (
                          <label htmlFor="">
                            What best
                            <br />
                            ?describes you
                          </label>
                        )}
                      </label>
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
                          <div
                            key={index}
                            className={`box ${
                              selectedRoles.includes(option) && "active"
                            }`}
                            onClick={() => toggleRoles(option)}
                          >
                            <div className="containn">
                              <span> {option}</span>
                              <span className="hover-text"> {option}</span>
                            </div>
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
                        {["Yes", "No"].map((option, index) => (
                          <div
                            key={index}
                            className={`box ${
                              useGitHub === option && "active"
                            }`}
                            onClick={() => toggleGitgub(option)}
                          >
                            <div className="containn">
                              <span> {option}</span>
                              <span className="hover-text"> {option}</span>
                            </div>
                          </div>
                        ))}
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
                            <div
                              key={index}
                              className={`box ${
                                testFeedback === option && "active"
                              }`}
                              onClick={() => toggleTestFeedback(option)}
                            >
                              <div className="containn">
                                <span> {option}</span>
                                <span className="hover-text"> {option}</span>
                              </div>
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
                          <div
                            key={index}
                            className={`box ${
                              launchingRange === option && "active"
                            }`}
                            onClick={() => toggleLaunchingRange(option)}
                          >
                            <div className="containn">
                              <span> {option}</span>
                              <span className="hover-text"> {option}</span>
                            </div>
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
                        value={tools}
                        onChange={handleChange}
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
                        name="specificFeature"
                        value={specificFeature}
                        onChange={handleChange}
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
                        name="biggestStruggle"
                        value={biggestStruggle}
                        onChange={handleChange}
                        id=""
                        style={{ height: 100 }}
                        placeholder="Free text field—make this personal, not formal"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="contain">
                  {!loadingBool ? (
                    <button type="submit">
                      <div className="containn">
                        <span>Submit</span>
                        <span className="hover-text">Submit</span>
                      </div>
                    </button>
                  ) : (
                    <div className="loading-container">
                      <LoadingAnimation />
                      <div className="txt">
                        Submitting your information. Please hold!
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="success-container">
                <Image
                  src={
                    !lightMode
                      ? "/svgs/yamify_logo_lg.svg"
                      : "/svgs/yamify_logo_lg_lm.svg"
                  }
                  alt="yamify logo"
                  className="logo"
                  width={30}
                  height={38}
                />

                <h1>
                  Welcome to the Future of Cloud,
                  <br /> Built Around You.
                </h1>
                <p>
                  Thanks for joining the waitlist — your spot is secured. 🚀
                  <br />
                  We’ll be reaching out soon with early access details, sneak
                  peeks, and exclusive launch perks.
                </p>
                <h3>— The Team</h3>

                <Image
                  className="end"
                  src="/svgs/yamify_gd.svg"
                  alt=""
                  width={797}
                  height={306}
                />
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinWaitlistModal;
