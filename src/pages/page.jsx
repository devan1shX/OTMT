import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  FlaskRound,
  Lightbulb,
  Rocket,
} from "lucide-react";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Cipdlogo from "../assets/images/CiPD_logo.png";
import cailogo from "../assets/images/cai_logo.png";
import cdnmlogo from "../assets/images/cdnm_logo.png";
import Ihublogo from "../assets/images/Ihub_logo.png";
import csmlogo from "../assets/images/csm_logo.png";
import coelogo from "../assets/images/coe_logo.png";
import logo1 from "../assets/images/logo_1.jpg";
import logo2 from "../assets/images/logo_2.jpg";
import logo3 from "../assets/images/logo_3.jpg";
import logo4 from "../assets/images/logo_4.jpg";

import { Box, Typography, Container, Button } from "@mui/material";
import { Schedule_meet_link, Submit_details_form } from "../assets/links";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const handleScroll = () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};

const Link = ({ children, href, style: userStyle = {}, ...props }) => {
  return (
    <a
      href={href}
      style={{ textDecoration: "none", color: "inherit", ...userStyle }}
      {...props}
    >
      {children}
    </a>
  );
};

const Card3D = ({ children, style: userStyle = {} }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = (y - centerY) / 10;
    const newRotateY = (centerX - x) / 10;
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        transition: "all 0.2s",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...userStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotateX, rotateY: rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroImageY = useParallax(smoothScrollYProgress, -100);
  const heroTextY = useParallax(smoothScrollYProgress, 50);

  const staggeredContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggeredItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const [count, setCount] = useState({
    projects: 0,
    partners: 0,
    years: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        projects: prev.projects < 200 ? prev.projects + 2 : 200,
        partners: prev.partners < 50 ? prev.partners + 1 : 50,
        years: prev.years < 15 ? prev.years + 1 : 15,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={targetRef}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <main style={{ flex: 1, overflow: "hidden" }}>
        <section
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "25%",
                height: "16rem",
                width: "16rem",
                borderRadius: "50%",
                backgroundColor: "rgba(187,247,208,0.3)",
                filter: "blur(40px)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "33%",
                right: "33%",
                height: "24rem",
                width: "24rem",
                borderRadius: "50%",
                backgroundColor: "rgba(219,234,254,0.2)",
                filter: "blur(40px)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
              }}
            >
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <motion.div
              style={{
                position: "absolute",
                top: "5rem",
                left: "15%",
                height: "4rem",
                width: "4rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(187,247,208,1)",
                backgroundColor: "rgba(236,253,245,0.5)",
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{
                position: "absolute",
                bottom: "8rem",
                left: "25%",
                height: "6rem",
                width: "6rem",
                borderRadius: "50%",
                border: "1px solid rgba(219,234,254,1)",
                backgroundColor: "rgba(219,234,254,0.3)",
              }}
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: "33%",
                right: "20%",
                height: "5rem",
                width: "5rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(187,247,208,1)",
                backgroundColor: "rgba(219,234,254,0.3)",
                transform: "rotate(12deg)",
              }}
              animate={{ y: [0, 15, 0], rotate: [12, 0, 12] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "3rem",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
              }}
            >
              <motion.div
                style={{ y: heroTextY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid rgba(187,247,208,1)",
                    backgroundColor: "rgba(236,253,245,0.8)",
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    backdropFilter: "blur(4px)",
                    fontSize: "0.875rem",
                  }}
                >
                  <span
                    style={{
                      marginRight: "0.5rem",
                      display: "inline-block",
                      height: "0.5rem",
                      width: "0.5rem",
                      borderRadius: "50%",
                      backgroundColor: "rgba(16,185,129,1)",
                    }}
                  ></span>
                  Innovate • Collaborate • Transform
                </div>

                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    margin: "1rem 0",
                  }}
                >
                  <span style={{ display: "block" }}>Office of Technology</span>
                  <span style={{ display: "block", marginTop: "0.25rem" }}>
                    Management and
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "0.25rem",
                      background: "linear-gradient(to right, #009393, #10b981)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Transfer
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: "1.25rem",
                    color: "#6b7280",
                    maxWidth: "28rem",
                  }}
                >
                  We bridge research and industry to create meaningful
                  innovations that solve real-world challenges.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <a
                    href={Submit_details_form}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      variant="contained"
                      className="contained schedule-button"
                    >
                      Commercialise Your Technology
                      <motion.div
                        style={{ marginLeft: "0.5rem" }}
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                style={{
                  position: "relative",
                  margin: "0 auto",
                  height: "500px",
                  width: "100%",
                  maxWidth: "600px",
                  y: heroImageY,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    animate={{
                      rotateY: [0, 10, 0, -10, 0],
                      rotateX: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>

                  <motion.div
                    style={{
                      position: "absolute",
                      right: "-35px",
                      top: "25%",
                      height: "8rem",
                      width: "8rem",
                      borderRadius: "0.5rem",
                      backgroundColor: "#d1fae5",
                    }}
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    style={{
                      position: "absolute",
                      left: "-16px",
                      bottom: "33%",
                      height: "6rem",
                      width: "6rem",
                      borderRadius: "50%",
                      backgroundColor: "#bfdbfe",
                    }}
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    style={{
                      position: "absolute",
                      left: "150px",
                      bottom: "73%",
                      height: "6rem",
                      width: "6rem",
                      borderRadius: "30%",
                      backgroundColor: "#bfdbfe",
                    }}
                    animate={{ y: [0, 25, 0], rotate: [0, 20, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            onClick={handleScroll}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "2.5rem",
                  width: "1.5rem",
                  borderRadius: "9999px",
                  border: "1px solid #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.25rem",
                }}
              >
                <motion.div
                  style={{
                    height: "0.5rem",
                    width: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#009393",
                  }}
                  animate={{ y: [0, 14, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  color: "#6b7280",
                }}
              >
                Scroll
              </span>
            </div>
          </motion.div>
          ;
        </section>

        <section style={{ padding: "4rem 0", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundImage:
                  "linear-gradient(to right, rgba(236,253,245,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,253,245,0.3) 1px, transparent 1px)",
                backgroundSize: "4rem 4rem",
              }}
            ></div>
          </div>

          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
          >
            <motion.div
              style={{
                textAlign: "center",
                marginBottom: "4rem",
                maxWidth: "32rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  letterSpacing: "-0.025em",
                }}
              >
                What We Do
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1.125rem",
                  color: "#6b7280",
                }}
              >
                We provide comprehensive services to support your technology
                development journey
              </p>
            </motion.div>

            <motion.div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
              variants={staggeredContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  style={{ position: "relative" }}
                  variants={staggeredItemVariants}
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "1rem",
                      border: "1px solid #f3f4f6",
                      backgroundColor: "white",
                      padding: "2rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(to br, rgba(16,185,129,0.1), transparent)",
                        opacity: 0,
                        transition: "opacity 0.5s ease",
                      }}
                    ></div>

                    <div
                      style={{
                        marginBottom: "1.5rem",
                        display: "inline-flex",
                        height: "3.5rem",
                        width: "3.5rem",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.75rem",
                        backgroundColor: "#f0fdf4",
                        color: "#009393",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <service.icon size={28} strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    <h3
                      style={{
                        marginBottom: "0.75rem",
                        fontSize: "1.25rem",
                        fontWeight: "600",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p style={{ color: "#6b7280" }}>{service.description}</p>

                    <div
                      style={{
                        marginTop: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        color: "#009393",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <Button className="outlined">
                        <Link href={service.href}>Learn more</Link>
                        <ArrowRight
                          size={16}
                          style={{ marginLeft: "0.5rem" }}
                        />
                      </Button>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight
                          size={16}
                          style={{ marginLeft: "0.5rem" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          style={{
            paddingTop: "2rem",
            paddingBottom: "1rem",
            background: "white",
            width: "100%",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
          >
            <motion.div
              style={{
                textAlign: "center",
                marginBottom: "4rem",
                maxWidth: "32rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  letterSpacing: "-0.025em",
                }}
              >
                Available Technologies
              </h2>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1.125rem",
                  color: "#6b7280",
                }}
              >
                Discover how we've helped transform innovative ideas into
                reality
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {highlights.map((highlight) => (
                <Link href={highlight.href} key={highlight.title}>
                  <Card3D style={{ height: "350px", position: "relative" }}>
                    <div
                      style={{
                        position: "relative",
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "1rem",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "all 0.5s ease",
                      }}
                    >
                      <img
                        src={highlight.image || "/placeholder.svg"}
                        alt={highlight.title}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.7s ease",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "1.5rem",
                            transform: "translateY(1rem)",
                            opacity: 0,
                            transition: "all 0.5s ease",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "600",
                              color: "white",
                            }}
                          >
                            {highlight.title}
                          </h3>
                          <p
                            style={{
                              marginTop: "0.5rem",
                              fontSize: "0.875rem",
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            {highlight.description}
                          </p>
                          <Button
                            style={{
                              marginTop: "1rem",
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "white",
                              backdropFilter: "blur(4px)",
                              border: "none",
                              padding: "0.5rem 1rem",
                            }}
                          >
                            Learn more
                            <ArrowRight
                              size={16}
                              style={{ marginLeft: "0.5rem" }}
                            />
                          </Button>
                        </div>
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "1.5rem",
                          transition: "transform 0.5s ease",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            color: "white",
                          }}
                        >
                          {highlight.title}
                        </h3>
                      </div>
                    </div>
                  </Card3D>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "4rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
              background:
                "radial-gradient(circle at center, rgba(236,253,245,0.8) 0%, rgba(255,255,255,0) 70%)",
            }}
          ></div>
        </section>
      </main>
    </div>
  );
}

const services = [
  {
    title: "Innovation Support",
    description:
      "Expert guidance to develop and refine your technology initiatives with our specialized team.",
    icon: Lightbulb,
  },
  {
    title: "Project Assessment",
    description:
      "Comprehensive evaluation of commercial potential and market feasibility for your innovations.",
    icon: FileText,
  },
  {
    title: "IP Management",
    description:
      "Strategic protection and management of intellectual property to maximize value and impact.",
    icon: FlaskRound,
  },
  {
    title: "Commercialization",
    description:
      "Transform groundbreaking research into market-ready solutions with our industry partnerships.",
    icon: Rocket,
  },
];

const highlights = [
  {
    title: "Seek Suspect",
    description:
      "Comprehensive innovation support services for researchers and entrepreneurs.",
    image: logo1,
    href: "https://otmt.iiitd.edu.in/data/brochures/1749953793590-Seek_Suspect.pdf",
  },
  {
    title: "Cloud Labs",
    description:
      "Advanced cloud computing solutions enabling cutting-edge research capabilities.",
    image: logo2,
    href: "https://otmt.iiitd.edu.in/data/brochures/1749888816280-Cloud_Labs.pdf",
  },
  {
    title: "TATDC",
    description:
      "Collaborative research platform connecting academia and industry for breakthrough innovations.",
    image: logo3,
    href: "https://otmt.iiitd.edu.in/data/brochures/1749954077535-TATDC.pdf",
  },
  {
    title: "FOODLE",
    description:
      "Revolutionary food technology innovation addressing global sustainability challenges.",
    image: logo4,
    href: "https://otmt.iiitd.edu.in/data/brochures/1752146504577-Foodle.pdf",
  },
];

const partners = [
  {
    name: "CIPD",
    logo: Cipdlogo,
  },
  {
    name: "CAI",
    logo: cailogo,
  },
  {
    name: "CDNM",
    logo: cdnmlogo,
  },
  {
    name: "Ihub",
    logo: Ihublogo,
  },
  {
    name: "CSM",
    logo: csmlogo,
  },
  {
    name: "COE  ",
    logo: coelogo,
  },
];
