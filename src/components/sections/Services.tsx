"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Code2, Cpu, Eye, Sparkles, type LucideIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { useScrollReveal } from "@/lib/useScrollReveal";

type Proof = {
  label: string;
  href: string;
  external?: boolean;
};

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  pills: string[];
  proof?: Proof;
  dominant?: boolean;
};

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web platforms with real payments, auth, and production deployment.",
    pills: ["Next.js", "React", "Node.js", "Flask"],
    proof: {
      label: "Shipped in Steadyhands",
      href: "https://steadyhandscatering.com",
      external: true,
    },
    dominant: true,
  },
  {
    icon: Cpu,
    title: "Systems Architecture",
    description:
      "Distributed systems, embedded devices, IoT, edge compute. Built to survive the real world.",
    pills: ["Edge", "Raspberry Pi", "IoT", "Python"],
    proof: {
      label: "Shipped in FishTech",
      href: "/projects/fishtech",
    },
  },
  {
    icon: Eye,
    title: "Computer Vision & ML",
    description:
      "Object detection, biomass estimation, custom metrics, tuned for low-resource deployment.",
    pills: ["YOLOv8", "OpenCV", "Python", "Edge AI"],
    proof: {
      label: "Shipped in FishTech",
      href: "/projects/fishtech",
    },
  },
  {
    icon: Sparkles,
    title: "AI & Intelligent Systems",
    description:
      "LLM integration, intelligent automation, decision-support tools that actually ship.",
    pills: ["OpenAI", "Claude API", "Automation", "Decision Support"],
  },
];

const HEADING_WORDS = ["What", "I", "do."] as const;

export function Services() {
  const reduceMotion = useReducedMotion() ?? false;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleGridPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll<HTMLElement>("[data-spotlight-card]");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      });
    },
    [isTouch],
  );

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
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

  const wordVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "0.15em" }}
          >
            {"// services.tsx"}
          </motion.div>

          <motion.h2
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="font-heading font-bold text-white"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordVariants}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 mb-12 max-w-prose text-[15px] text-text-secondary md:mb-24 md:max-w-[52ch] md:text-[16px]"
            style={{ lineHeight: 1.7 }}
          >
            Four practical disciplines. Every service backed by real shipped
            work.
          </motion.p>

          <div
            ref={gridRef}
            onPointerMove={handleGridPointerMove}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5"
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="h-full"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center md:mt-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-4 py-3 text-text-secondary"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px" }}
            >
              Have a project in mind?{" "}
              <span className="font-medium text-accent underline-offset-4 group-hover:underline">
                Start a conversation →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
};

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  const dominant = service.dominant === true;

  return (
    <article
      data-spotlight-card
      data-cursor-interactive
      className="group relative flex h-full flex-col overflow-hidden rounded-[16px] p-5 md:p-7"
      style={{
        background: dominant ? "rgba(0, 229, 192, 0.025)" : "var(--bg-surface)",
        border: dominant
          ? "1px solid rgba(0, 229, 192, 0.22)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: dominant
          ? "0 24px 60px -28px rgba(0, 229, 192, 0.28), 0 0 0 1px rgba(0, 229, 192, 0.06) inset"
          : undefined,
        transition: "border-color 200ms ease, transform 200ms ease",
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "50%",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = "rgba(0, 229, 192, 0.4)";
        event.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = dominant
          ? "rgba(0, 229, 192, 0.22)"
          : "rgba(255, 255, 255, 0.06)";
        event.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(350px at var(--mouse-x) var(--mouse-y), rgba(0,229,192,0.08), transparent 70%)",
        }}
      />

      {dominant ? (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100"
          aria-hidden
        >
          <BorderBeam />
        </span>
      ) : (
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <BorderBeam />
        </span>
      )}

      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between md:mb-4">
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{
              borderRadius: "10px",
              background: dominant
                ? "rgba(0, 229, 192, 0.18)"
                : "rgba(0, 229, 192, 0.1)",
              border: dominant
                ? "1px solid rgba(0, 229, 192, 0.4)"
                : "1px solid rgba(0, 229, 192, 0.2)",
            }}
          >
            <Icon size={20} strokeWidth={1.75} className="text-accent" />
          </div>
          {dominant ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/[0.08] px-2 py-1 text-accent"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.18em",
                lineHeight: 1,
              }}
            >
              <span
                aria-hidden
                className="block h-[5px] w-[5px] rounded-full bg-accent"
                style={{ animation: "live-pulse 2s ease-in-out infinite" }}
              />
              FLAGSHIP
            </span>
          ) : null}
        </div>

        <h3
          className="mb-2 font-heading font-semibold leading-tight tracking-[-0.015em] text-text-primary"
          style={{
            fontSize: dominant ? "20px" : "17px",
          }}
        >
          {service.title}
        </h3>

        <p
          className="mb-4 text-text-secondary"
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {service.description}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {service.pills.map((pill) => (
              <span
                key={pill}
                className="font-mono"
                style={{
                  fontSize: "11px",
                  color: "rgba(0, 229, 192, 0.9)",
                  background: "rgba(0, 229, 192, 0.08)",
                  border: "1px solid rgba(0, 229, 192, 0.15)",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  lineHeight: 1.4,
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {service.proof ? (
            <a
              href={service.proof.href}
              {...(service.proof.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group/proof inline-flex w-fit items-center gap-1.5 border-t border-white/[0.06] pt-3 text-text-tertiary transition-colors duration-200 hover:text-accent"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "10.5px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {service.proof.label}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover/proof:translate-x-0.5"
              >
                →
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
