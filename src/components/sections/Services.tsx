"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Cpu, Eye, Sparkles, type LucideIcon } from "lucide-react";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { CardSpotlight } from "@/components/ui/CardSpotlight";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  pills: string[];
};

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web platforms with real payments, auth, and production deployment.",
    pills: ["Next.js", "React", "Node.js", "Flask"],
  },
  {
    icon: Cpu,
    title: "Systems Architecture",
    description:
      "Distributed systems, embedded devices, IoT, edge compute — built to survive the real world.",
    pills: ["Edge", "Raspberry Pi", "IoT", "Python"],
  },
  {
    icon: Eye,
    title: "Computer Vision & ML",
    description:
      "Object detection, biomass estimation, custom metrics — tuned for low-resource deployment.",
    pills: ["YOLOv8", "OpenCV", "Python", "Edge AI"],
  },
  {
    icon: Sparkles,
    title: "AI & Intelligent Systems",
    description:
      "LLM integration, intelligent automation, decision-support tools that actually ship.",
    pills: ["OpenAI", "Claude API", "Automation", "Decision Support"],
  },
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-bg-primary py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <div
            className="mb-6 font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "0.15em" }}
          >
            // services.tsx
          </div>
          <h2
            className="font-heading font-extrabold text-text-primary"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            What I build
          </h2>
          <p
            className="mt-6 max-w-[52ch] text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            Four practical disciplines. Every service backed by something I&apos;ve
            actually shipped.
          </p>
        </motion.div>

        <CardSpotlight className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              reduceMotion={reduceMotion ?? false}
            />
          ))}
        </CardSpotlight>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-12 text-center md:mt-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-4 py-3 text-text-secondary"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px" }}
          >
            Have a project in mind?{" "}
            <span className="font-medium text-accent group-hover:underline">
              Start a conversation →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: Service;
  index: number;
  reduceMotion: boolean;
};

function ServiceCard({ service, index, reduceMotion }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      data-spotlight-card
      initial={
        reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="group relative overflow-hidden rounded-[16px] bg-bg-surface p-6 md:p-7"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.06)",
        transition:
          "border-color 200ms ease, transform 200ms ease",
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "50%",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = "rgba(0, 229, 192, 0.3)";
        event.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
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

      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <BorderBeam />
      </span>

      <div className="relative">
        <div
          className="flex h-10 w-10 items-center justify-center"
          style={{
            borderRadius: "10px",
            background: "rgba(0, 229, 192, 0.1)",
            border: "1px solid rgba(0, 229, 192, 0.2)",
          }}
        >
          <Icon size={20} strokeWidth={1.75} className="text-accent" />
        </div>

        <h3
          className="mt-5 font-heading font-bold text-text-primary"
          style={{
            fontSize: "20px",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "8px",
          }}
        >
          {service.title}
        </h3>

        <p
          className="text-text-secondary"
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            marginBottom: "16px",
          }}
        >
          {service.description}
        </p>

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
      </div>
    </motion.article>
  );
}
