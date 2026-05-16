"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollReveal } from "@/lib/useScrollReveal";

const WHATSAPP_HREF =
  "https://wa.me/263780802880?text=Hi%20Daniel%2C%20I%20saw%20your%20portfolio%20and";

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a bit long."),
  email: z
    .string()
    .trim()
    .email("That email looks off.")
    .max(200, "That email is a bit long."),
  message: z
    .string()
    .trim()
    .min(10, "A little more context, please.")
    .max(2000, "That message is too long."),
  company: z.string().max(200).optional(),
});

type FormValues = z.infer<typeof FormSchema>;
type SubmitState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

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

  const underlineVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[520px] w-[520px] rounded-full bg-accent opacity-[0.08] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-x-16"
        >
          <div className="order-1 min-w-0">
            <motion.div
              variants={itemVariants}
              className="mb-5 flex items-center gap-3"
            >
              <span
                className="text-text-tertiary"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </span>
              <motion.span
                aria-hidden
                variants={underlineVariants}
                style={{ originX: 0 }}
                className="h-px w-10 bg-accent"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-heading font-semibold text-text-primary"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
              }}
            >
              Let&apos;s build something worth{" "}
              <span
                className="font-normal italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#00E5C0",
                  letterSpacing: "-0.025em",
                }}
              >
                shipping
              </span>
              .
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-[460px] text-text-secondary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Open to remote engineering roles, contract work, and select
              Zimbabwean client projects. WhatsApp is the fastest way to reach
              me. Email and the form below also work.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <WhatsAppCTA reduceMotion={reduceMotion} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3"
            >
              <ChannelCard
                href="https://github.com/DACDaniels"
                external
                label="GitHub"
                handle="@DACDaniels"
                icon={<GitHubIcon className="h-[22px] w-[22px]" />}
              />
              <ChannelCard
                href="https://www.linkedin.com/in/daniel-chadambuka-792b74277/"
                external
                label="LinkedIn"
                handle="Daniel Chadambuka"
                icon={<LinkedInIcon className="h-[22px] w-[22px]" />}
              />
              <ChannelCard
                href="mailto:chadambukadaniel@gmail.com"
                label="Email"
                handle="chadambukadaniel@gmail.com"
                icon={<Mail className="h-[22px] w-[22px]" strokeWidth={1.6} />}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10">
              <Clocks reduceMotion={reduceMotion} />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="order-2 min-w-0"
          >
            <ContactForm reduceMotion={reduceMotion} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppCTA({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <MagneticButton
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      strength={18}
      ariaLabel="Message me on WhatsApp"
      className="group rounded-full"
    >
      <span
        className="relative inline-flex items-center gap-3 rounded-full bg-accent px-7 py-[18px] text-bg-primary"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "0.005em",
          color: "#080808",
          animation: reduceMotion
            ? "none"
            : "contact-whatsapp-pulse 3s ease-in-out infinite",
        }}
      >
        <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
        Message me on WhatsApp
        <ArrowRight
          className="h-[16px] w-[16px] transition-transform duration-300 ease-out group-hover:translate-x-1"
          strokeWidth={2}
        />
      </span>
    </MagneticButton>
  );
}

function ChannelCard({
  href,
  external,
  label,
  handle,
  icon,
}: {
  href: string;
  external?: boolean;
  label: string;
  handle: string;
  icon: ReactNode;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className="group flex flex-col gap-6 rounded-[14px] border border-white/[0.08] bg-white/[0.025] p-[18px] transition-[border-color,background-color] duration-300 ease-out hover:border-accent/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-[22px] w-[22px] items-center justify-center text-text-primary transition-colors duration-300 group-hover:text-accent">
          {icon}
        </span>
        <ArrowUpRight
          className="h-[14px] w-[14px] text-text-tertiary transition-transform duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent"
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span
          className="text-text-tertiary"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          className="text-text-primary"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: 1.4,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
          title={handle}
        >
          {handle}
        </span>
      </div>
    </a>
  );
}

type ClockParts = { h: string; m: string; s: string };
type ClockState = {
  visitorZone: string;
  visitorTime: ClockParts;
  harareTime: ClockParts;
};

function Clocks({ reduceMotion }: { reduceMotion: boolean }) {
  const [state, setState] = useState<ClockState | null>(null);

  useEffect(() => {
    const zone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Harare";

    const visitorFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const harareFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Harare",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const partsToClock = (formatter: Intl.DateTimeFormat): ClockParts => {
      const parts = formatter.formatToParts(new Date());
      const h = parts.find((p) => p.type === "hour")?.value ?? "00";
      const m = parts.find((p) => p.type === "minute")?.value ?? "00";
      const s = parts.find((p) => p.type === "second")?.value ?? "00";
      return { h, m, s };
    };

    const tick = () => {
      setState({
        visitorZone: zone,
        visitorTime: partsToClock(visitorFormatter),
        harareTime: partsToClock(harareFormatter),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const visitorZone = state?.visitorZone ?? null;
  const visitorTime = state?.visitorTime ?? null;
  const harareTime = state?.harareTime ?? null;
  const sameClockAsHarare =
    visitorTime !== null &&
    harareTime !== null &&
    visitorTime.h === harareTime.h &&
    visitorTime.m === harareTime.m;

  const visitorZoneLabel = useMemo(() => {
    if (!visitorZone) return "";
    return visitorZone.replace(/_/g, " ");
  }, [visitorZone]);

  return (
    <div className="border-t border-white/[0.08] pt-7">
      <div
        className="mb-4 text-text-tertiary"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Real-time
      </div>

      {visitorZone === null ? (
        <ClockPlaceholder />
      ) : sameClockAsHarare ? (
        <SingleHarareClock time={harareTime} reduceMotion={reduceMotion} />
      ) : (
        <DualClocks
          visitorTime={visitorTime}
          visitorZoneLabel={visitorZoneLabel}
          harareTime={harareTime}
          reduceMotion={reduceMotion}
        />
      )}
    </div>
  );
}

function ClockPlaceholder() {
  return (
    <div
      className="text-text-tertiary"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "28px",
        letterSpacing: "-0.02em",
        fontWeight: 500,
      }}
    >
      --:--:--
    </div>
  );
}

function SingleHarareClock({
  time,
  reduceMotion,
}: {
  time: ClockParts | null;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="tabular-nums text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "32px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          textShadow: "0 0 24px rgba(0, 229, 192, 0.35)",
        }}
      >
        {time?.h ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.m ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.s ?? "--"}
      </div>
      <div
        className="mt-3 text-text-tertiary"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Harare · UTC+2
      </div>
      <p
        className="mt-4 max-w-[280px] text-text-secondary"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          lineHeight: 1.6,
        }}
      >
        We&apos;re on the same clock. Pick a channel above.
      </p>
    </div>
  );
}

function DualClocks({
  visitorTime,
  visitorZoneLabel,
  harareTime,
  reduceMotion,
}: {
  visitorTime: ClockParts | null;
  visitorZoneLabel: string;
  harareTime: ClockParts | null;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-7">
      <ClockColumn
        label={`Your time · ${visitorZoneLabel}`}
        time={visitorTime}
        accent={false}
        reduceMotion={reduceMotion}
      />
      <div
        aria-hidden
        className="hidden pt-[8px] text-text-tertiary sm:block"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "22px",
          lineHeight: 1,
        }}
      >
        ↔
      </div>
      <ClockColumn
        label="Harare · UTC+2"
        time={harareTime}
        accent
        reduceMotion={reduceMotion}
      />
    </div>
  );
}

function ClockColumn({
  label,
  time,
  accent,
  reduceMotion,
}: {
  label: string;
  time: ClockParts | null;
  accent: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "28px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: accent ? "#00E5C0" : "var(--text-primary)",
          textShadow: accent ? "0 0 18px rgba(0, 229, 192, 0.35)" : "none",
        }}
      >
        {time?.h ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.m ?? "--"}
        <Colon reduceMotion={reduceMotion} />
        {time?.s ?? "--"}
      </div>
      <div
        className="mt-2 text-text-tertiary"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Colon({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block px-[0.05em]"
      style={{
        animation: reduceMotion
          ? "none"
          : "contact-colon-pulse 1s ease-in-out infinite",
      }}
    >
      :
    </span>
  );
}

function ContactForm({ reduceMotion }: { reduceMotion: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  useEffect(() => {
    if (submitState === "success") {
      const t = window.setTimeout(() => {
        setSubmitState("idle");
        reset();
      }, 4000);
      return () => window.clearTimeout(t);
    }
    if (submitState === "error") {
      const t = window.setTimeout(() => {
        setSubmitState("idle");
        setErrorMessage(null);
      }, 5000);
      return () => window.clearTimeout(t);
    }
  }, [submitState, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setSubmitState("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMessage(data?.error ?? null);
        setSubmitState("error");
        return;
      }
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const showError = (field: keyof FormValues) =>
    Boolean(errors[field]) && (touchedFields[field] || isSubmitted);

  return (
    <div
      className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-7 md:p-8"
      style={{
        boxShadow:
          "0 24px 64px -28px rgba(0, 229, 192, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <div
        className="mb-6 text-text-tertiary"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Or drop a message
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <FloatingField
          id="contact-name"
          label="Your name"
          error={showError("name") ? errors.name?.message : null}
        >
          <input
            id="contact-name"
            type="text"
            placeholder=" "
            autoComplete="name"
            spellCheck={false}
            className="contact-input"
            {...register("name")}
          />
        </FloatingField>

        <FloatingField
          id="contact-email"
          label="Your email"
          error={showError("email") ? errors.email?.message : null}
        >
          <input
            id="contact-email"
            type="email"
            placeholder=" "
            autoComplete="email"
            spellCheck={false}
            className="contact-input"
            {...register("email")}
          />
        </FloatingField>

        <FloatingField
          id="contact-message"
          label="Your message"
          error={showError("message") ? errors.message?.message : null}
          textarea
        >
          <textarea
            id="contact-message"
            rows={4}
            placeholder=" "
            className="contact-input contact-textarea"
            {...register("message")}
          />
        </FloatingField>

        <SubmitButton
          state={submitState}
          reduceMotion={reduceMotion}
          errorMessage={errorMessage}
        />
      </form>

      <style jsx>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
          padding: 14px 0 10px 0;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.5;
          outline: none;
          box-sizing: border-box;
          transition: border-color 200ms ease;
        }
        .contact-input::placeholder {
          color: transparent;
        }
        .contact-input:focus,
        .contact-input:not(:placeholder-shown) {
          border-bottom-color: #00e5c0;
        }
        .contact-textarea {
          resize: none;
          min-height: 110px;
        }
      `}</style>
    </div>
  );
}

function FloatingField({
  id,
  label,
  error,
  textarea,
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  textarea?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="contact-field">
      {children}
      <label htmlFor={id} className="contact-label">
        {label}
      </label>
      {error ? (
        <p className="contact-error" role="alert">
          {error}
        </p>
      ) : null}

      <style jsx>{`
        .contact-field {
          position: relative;
          margin-bottom: ${textarea ? "8px" : "4px"};
          padding-top: 18px;
          padding-bottom: ${error ? "0" : "16px"};
        }
        .contact-label {
          position: absolute;
          left: 0;
          top: 32px;
          color: var(--text-tertiary);
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 400;
          pointer-events: none;
          transform-origin: left center;
          transition:
            transform 200ms ease,
            color 200ms ease;
        }
        .contact-field :global(.contact-input:focus) + .contact-label,
        .contact-field
          :global(.contact-input:not(:placeholder-shown))
          + .contact-label {
          transform: translateY(-22px) scale(0.78);
          color: #00e5c0;
        }
        .contact-error {
          margin-top: 6px;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          line-height: 1.4;
          color: rgba(244, 63, 94, 0.9);
        }
      `}</style>
    </div>
  );
}

function SubmitButton({
  state,
  reduceMotion,
  errorMessage,
}: {
  state: SubmitState;
  reduceMotion: boolean;
  errorMessage: string | null;
}) {
  const isSubmitting = state === "submitting";
  const isSuccess = state === "success";
  const isError = state === "error";

  const label = (() => {
    if (isSubmitting) return "Sending";
    if (isSuccess) return "Sent. I'll be in touch.";
    if (isError)
      return errorMessage ?? "Couldn't send. Try again or DM me on WhatsApp.";
    return "Send message";
  })();

  const announcement = (() => {
    if (isSubmitting) return "Sending your message.";
    if (isSuccess) return "Message sent. Daniel will be in touch.";
    if (isError) return errorMessage ?? "Could not send. Try again later.";
    return "";
  })();

  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      className="contact-submit"
      data-state={state}
      aria-live="polite"
    >
      {!reduceMotion && isSubmitting ? (
        <span aria-hidden className="contact-submit-sweep" />
      ) : null}

      <span className="contact-submit-inner">
        {isSuccess ? (
          <Check className="h-4 w-4" strokeWidth={2.25} />
        ) : null}
        <span>{label}</span>
        {!isSuccess && !isError ? (
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        ) : null}
      </span>

      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {announcement}
      </span>

      <style jsx>{`
        .contact-submit {
          position: relative;
          width: 100%;
          margin-top: 12px;
          padding: 16px 20px;
          background: transparent;
          border: 1px solid #00e5c0;
          color: #00e5c0;
          border-radius: 999px;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          overflow: hidden;
          transition:
            background-color 220ms ease,
            color 220ms ease,
            border-color 220ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          background-color: rgba(0, 229, 192, 0.08);
        }
        .contact-submit:disabled {
          cursor: default;
          opacity: 0.85;
          pointer-events: none;
        }
        .contact-submit[data-state="success"] {
          background-color: #00e5c0;
          color: #080808;
          border-color: #00e5c0;
          opacity: 1;
        }
        .contact-submit[data-state="error"] {
          border-color: rgba(244, 63, 94, 0.6);
          color: var(--text-primary);
          animation: ${reduceMotion
            ? "none"
            : "contact-error-shake 400ms ease-in-out"};
        }
        .contact-submit-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .contact-submit-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 229, 192, 0.15),
            transparent
          );
          animation: contact-submit-sweep 1.2s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </button>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.73V1.72C24 .77 23.21 0 22.22 0Z" />
    </svg>
  );
}
