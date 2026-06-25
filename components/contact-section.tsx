"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, Loader2Icon, MailIcon, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";

const contactInfo = [
  {
    icon: <MailIcon />,
    label: "Email",
    value: "info@genolink.ai",
    href: "mailto:info@genolink.ai",
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: "+370 6 89 89 140",
    href: "tel:+37060000000",
  },
] as const;

type SubmitStatus = "idle" | "loading" | "success" | "error";

const labelMotion = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
};

export function ContactSection() {
  const { t } = useI18n();
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-8 font-sans md:grid-cols-2 md:gap-12 lg:gap-16">
      <div className="col-span-1 flex flex-col space-y-4">
        <h2 className="section-heading text-2xl md:text-3xl">
          {t("Contact us")}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          {t(
            "Questions about GenoLink, partnerships, or a demo? Send us a message and we'll get back to you.",
          )}
        </p>
        <p className="max-w-md text-xs leading-relaxed text-white/40 md:text-sm">
          {t("We aim to respond within one business day.")}
        </p>
        <div className="grid gap-4">
          {contactInfo.map((info) => (
            <ContactInfo key={info.label} {...info} />
          ))}
        </div>
      </div>
      <div className="col-span-1 flex w-full items-start">
        <ContactForm />
      </div>
    </div>
  );
}

function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isDisabled = status === "loading" || status === "success";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDisabled) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? t("Something went wrong. Please try again."));
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t("Something went wrong. Please try again."),
      );
    }
  }

  return (
    <form className="w-full font-sans" onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="full-name" className="text-white/80">
            {t("Full name")}
          </FieldLabel>
          <Input
            autoComplete="name"
            disabled={isDisabled}
            id="full-name"
            name="name"
            placeholder={t("Jane Doe")}
            required
            className="border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35 disabled:opacity-60"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-white/80">
            {t("Email")}
          </FieldLabel>
          <Input
            autoComplete="email"
            disabled={isDisabled}
            id="email"
            name="email"
            placeholder={t("jane@clinic.com")}
            required
            type="email"
            className="border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35 disabled:opacity-60"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message" className="text-white/80">
            {t("Message")}
          </FieldLabel>
          <Textarea
            autoComplete="off"
            disabled={isDisabled}
            id="message"
            name="message"
            placeholder={t("How can we help?")}
            required
            className="min-h-28 border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35 disabled:opacity-60"
          />
        </Field>
      </FieldGroup>

      <div className="mt-8 space-y-3">
        <motion.div layout transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <Button
            className={cn(
              "relative h-11 w-full overflow-hidden rounded-full font-sans transition-colors duration-300",
              status === "success"
                ? "bg-emerald-400 text-black hover:bg-emerald-400"
                : "bg-white text-black hover:bg-white/90",
            )}
            disabled={isDisabled}
            type="submit"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "loading" ? (
                <motion.span
                  key="loading"
                  className="inline-flex items-center gap-2"
                  {...labelMotion}
                >
                  <Loader2Icon className="size-4 animate-spin" />
                  {t("Sending...")}
                </motion.span>
              ) : status === "success" ? (
                <motion.span
                  key="success"
                  className="inline-flex items-center gap-2"
                  {...labelMotion}
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  >
                    <CheckIcon className="size-4" strokeWidth={2.5} />
                  </motion.span>
                  {t("Email sent")}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="inline-flex items-center gap-2"
                  {...labelMotion}
                >
                  {t("Submit")}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <AnimatePresence initial={false}>
          {status === "success" ? (
            <motion.p
              key="success-message"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-sm text-emerald-300/90"
            >
              {t("Thanks — we'll be in touch soon.")}
            </motion.p>
          ) : status === "error" && errorMessage ? (
            <motion.p
              key="error-message"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-sm text-red-300/90"
              role="alert"
            >
              {errorMessage}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

type ContactInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  className?: string;
};

function ContactInfo({
  icon,
  label,
  value,
  href,
  className,
}: ContactInfoProps) {
  const { t } = useI18n();
  const content = (
    <>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-white/80 shadow-xs [&_svg]:size-5">
        {icon}
      </div>
      <div>
        <p className="font-medium text-white">{t(label)}</p>
        <p className="text-xs text-white/45">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "flex cursor-pointer items-center gap-3 py-2 transition-opacity hover:opacity-80",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      {content}
    </div>
  );
}
