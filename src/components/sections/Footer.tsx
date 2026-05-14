"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/DACDaniels" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daniel-chadambuka-792b74277",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/263780802880?text=Hi%20Daniel%2C%20I%20saw%20your%20portfolio%20and",
  },
  { label: "Email", href: "mailto:chadambukadaniel@gmail.com" },
] as const;

const COLOPHON_LINES = ["Next.js 15", "Vercel", "Geist · DM Sans", "v.2026.05"];

const NAME_WORDS = ["Daniel", "Chadambuka"] as const;

export function Footer() {
  const reduceMotion = useReducedMotion() ?? false;

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  const signatureVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const wordVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.95] },
        },
      };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-bg-primary"
      style={{ paddingTop: "80px", paddingBottom: "24px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2"
        style={{
          bottom: "200px",
          width: "min(800px, 90vw)",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(0, 229, 192, 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={itemVariants}
            className="text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {"// footer.tsx"}
          </motion.div>

          <motion.h2
            variants={signatureVariants}
            className="footer-signature font-heading font-bold text-text-primary"
            style={{
              fontSize: "clamp(2.75rem, 10vw, 10.5rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              padding: "40px 0 64px",
            }}
          >
            <motion.span
              variants={wordVariants}
              className="footer-signature-word inline-block"
            >
              {NAME_WORDS[0]}
            </motion.span>{" "}
            <motion.span
              variants={wordVariants}
              className="footer-signature-word inline-block"
            >
              {NAME_WORDS[1]}
              <span
                aria-hidden
                className="footer-signature-period"
                style={{
                  background: "#00E5C0",
                  filter: "drop-shadow(0 0 24px rgba(0, 229, 192, 0.5))",
                }}
              />
            </motion.span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            aria-hidden
            style={{
              height: "0.5px",
              width: "100%",
              background:
                "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.12) 80%, transparent)",
            }}
          />

          <motion.div
            variants={itemVariants}
            className="footer-meta-grid"
            style={{
              display: "grid",
              padding: "48px 0",
            }}
          >
            <FooterColumn label="Identity">
              <div
                className="font-heading text-text-primary"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Daniel Chadambuka
              </div>
              <div
                className="text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  marginTop: "6px",
                }}
              >
                Software Engineer · Harare, ZW
              </div>
            </FooterColumn>

            <FooterColumn label="Navigate">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn label="Connect">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {CONNECT_LINKS.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={`${link.label} (opens in new tab)`}
                        className="footer-connect-link"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="footer-connect-arrow"
                          size={14}
                          strokeWidth={2}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </FooterColumn>

            <FooterColumn label="Colophon">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.5)",
                  lineHeight: 1.9,
                }}
              >
                {COLOPHON_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </FooterColumn>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="footer-bottom-bar"
            style={{
              borderTop: "0.5px solid rgba(255, 255, 255, 0.06)",
              padding: "24px 0",
            }}
          >
            <p
              className="footer-copyright"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                color: "rgba(255, 255, 255, 0.35)",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              © 2026 Daniel Chadambuka · All rights reserved
            </p>

            <div
              className="footer-status"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "#00E5C0",
                  boxShadow: "0 0 8px #00E5C0",
                  animation: reduceMotion
                    ? "none"
                    : "live-pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Available for work
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .footer-signature-word {
          will-change: transform, filter, opacity;
        }
        .footer-signature-period {
          display: inline-block;
          width: 0.18em;
          height: 0.18em;
          border-radius: 0.025em;
          vertical-align: baseline;
          margin-left: 0.04em;
        }
        @media (min-width: 768px) {
          .footer-signature {
            white-space: nowrap;
          }
        }
        .footer-meta-grid {
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .footer-meta-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (min-width: 1024px) {
          .footer-meta-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr;
            gap: 48px;
          }
        }
        .footer-nav-link,
        .footer-connect-link {
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 2;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-nav-link:hover,
        .footer-connect-link:hover {
          color: #00e5c0;
        }
        .footer-connect-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .footer-connect-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition:
            color 200ms ease,
            transform 200ms ease;
        }
        .footer-connect-link:hover .footer-connect-arrow {
          color: #00e5c0;
          transform: translate(2px, -2px);
        }
        .footer-bottom-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        @media (max-width: 639px) {
          .footer-bottom-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }
          .footer-copyright {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.35)",
          marginBottom: "16px",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
