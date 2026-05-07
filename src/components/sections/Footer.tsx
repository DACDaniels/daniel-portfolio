"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { lastCommit } from "@/lib/build-info";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#services" },
  { label: "Contact", href: "mailto:chadambukadaniel@gmail.com" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/DACDaniels",
    icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-chadambuka-792b74277/",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:chadambukadaniel@gmail.com",
    icon: MailIcon,
    external: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/263780802880",
    icon: WhatsAppIcon,
    external: true,
  },
] as const;

function MailIcon({ className }: { className?: string }) {
  return <Mail className={className} />;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.73V1.72C24 .77 23.21 0 22.22 0Z" />
    </svg>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  const coordinateVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 32, filter: "blur(14px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-bg-primary py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.08] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[320px] w-[320px] rounded-full bg-accent opacity-[0.05] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-7">
            <motion.div variants={itemVariants}>
              <span
                className="text-accent"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                // footer.tsx
              </span>
            </motion.div>

            <motion.div
              variants={coordinateVariants}
              className="mt-5 text-white"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              <span className="block">
                17.8292
                <DegreeSymbol />S,
              </span>
              <span className="block">
                31.0522
                <DegreeSymbol />E
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-white/65"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "14px",
                letterSpacing: "0.05em",
              }}
            >
              Harare, Zimbabwe
            </motion.p>

            <motion.div variants={itemVariants} className="mt-7">
              <LiveClock reduceMotion={reduceMotion} />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md text-text-tertiary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              Designed and built in Harare. Coffee optional, internet
              negotiable.
            </motion.p>
          </div>

          <div className="flex flex-col gap-10 md:col-span-5 md:items-end md:text-right">
            <motion.nav variants={itemVariants} aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink
                      href={link.href}
                      label={link.label}
                      external={link.href.startsWith("mailto:")}
                    />
                  </li>
                ))}
              </ul>
            </motion.nav>

            <motion.div variants={itemVariants}>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <SocialIcon
                      href={social.href}
                      label={social.label}
                      Icon={social.icon}
                      external={social.external}
                    />
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-text-tertiary md:text-right"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                lineHeight: 1.6,
                letterSpacing: "0.02em",
              }}
            >
              <span className="block md:inline">Built with Next.js 15</span>
              <Sep />
              <span className="block md:inline">Deployed on Vercel</span>
              <Sep />
              <span className="block md:inline">Last commit {lastCommit}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
          className="mt-16 flex items-center justify-between gap-6 border-t border-white/[0.04] pt-6 md:mt-20"
        >
          <p
            className="text-text-tertiary"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              letterSpacing: "0.02em",
            }}
          >
            © 2026 Daniel Chadambuka. All rights reserved.
          </p>

          <BackToTop />
        </motion.div>
      </div>
    </footer>
  );
}

function DegreeSymbol() {
  return (
    <span
      aria-hidden
      className="text-accent"
      style={{
        textShadow: "0 0 18px rgba(0, 229, 192, 0.55)",
      }}
    >
      °
    </span>
  );
}

function Sep() {
  return (
    <span
      aria-hidden
      className="hidden text-white/15 md:inline"
      style={{ padding: "0 10px" }}
    >
      ·
    </span>
  );
}

function LiveClock({ reduceMotion }: { reduceMotion: boolean }) {
  const [time, setTime] = useState<{ h: string; m: string; s: string } | null>(
    null,
  );

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Harare",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => {
      const parts = formatter.formatToParts(new Date());
      const h = parts.find((p) => p.type === "hour")?.value ?? "00";
      const m = parts.find((p) => p.type === "minute")?.value ?? "00";
      const s = parts.find((p) => p.type === "second")?.value ?? "00";
      setTime({ h, m, s });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-white/75"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "13px",
        letterSpacing: "0.06em",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-accent"
        style={{
          boxShadow: "0 0 8px rgba(0, 229, 192, 0.7)",
          animation: reduceMotion ? "none" : "live-pulse 2s ease-in-out infinite",
        }}
      />
      <span className="tabular-nums">
        {time?.h ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.m ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.s ?? "--"}
      </span>
      <span className="text-white/40"> in Harare (UTC+2)</span>
    </div>
  );
}

function Colon({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block px-[0.05em] text-accent"
      style={{
        animation: reduceMotion
          ? "none"
          : "footer-colon-pulse 1s ease-in-out infinite",
      }}
    >
      :
    </span>
  );
}

function FooterNavLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const isAnchor = href.startsWith("#");

  if (isAnchor) {
    return (
      <MagneticButton
        href={href}
        ariaLabel={label}
        strength={10}
        className="group relative inline-flex items-center text-white/70 transition-colors duration-200 hover:text-white"
      >
        <span
          className="relative"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {label}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        </span>
      </MagneticButton>
    );
  }

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className="group relative inline-flex items-center text-white/70 transition-colors duration-200 hover:text-white"
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
    </a>
  );
}

function SocialIcon({
  href,
  label,
  Icon,
  external,
}: {
  href: string;
  label: string;
  Icon: (props: { className?: string }) => React.ReactElement;
  external: boolean;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      {...externalProps}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/65 transition-[transform,color,border-color,background-color] duration-200 hover:scale-110 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.05 4.94A10.43 10.43 0 0 0 12.06 2C6.78 2 2.49 6.29 2.49 11.57c0 1.86.51 3.65 1.48 5.24L2.4 22l5.32-1.39a9.55 9.55 0 0 0 4.34 1.04h.01c5.27 0 9.57-4.29 9.57-9.57 0-2.55-1-4.95-2.6-6.74Zm-7 14.4h-.01a7.96 7.96 0 0 1-4.05-1.11l-.29-.17-3.16.83.84-3.08-.19-.31a7.96 7.96 0 0 1-1.22-4.27c0-4.4 3.58-7.97 7.99-7.97 2.13 0 4.13.83 5.64 2.34a7.92 7.92 0 0 1 2.34 5.64c0 4.4-3.58 7.99-7.99 7.99Zm4.38-5.97c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function BackToTop() {
  return (
    <MagneticButton
      ariaLabel="Back to top"
      strength={14}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="!flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent transition-[background-color,border-color,color] duration-200 hover:border-accent hover:bg-accent hover:text-bg-primary md:h-12 md:w-12"
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </MagneticButton>
  );
}
