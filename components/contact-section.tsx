"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, PhoneIcon } from "lucide-react";
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
  return (
    <form className="w-full font-sans">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="full-name" className="text-white/80">
            {t("Full name")}
          </FieldLabel>
          <Input
            autoComplete="name"
            id="full-name"
            placeholder={t("Jane Doe")}
            className="border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-white/80">
            {t("Email")}
          </FieldLabel>
          <Input
            autoComplete="email"
            id="email"
            placeholder={t("jane@clinic.com")}
            type="email"
            className="border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message" className="text-white/80">
            {t("Message")}
          </FieldLabel>
          <Textarea
            autoComplete="off"
            id="message"
            placeholder={t("How can we help?")}
            className="min-h-28 border-white/15 bg-white/5 font-sans text-white placeholder:text-white/35"
          />
        </Field>
      </FieldGroup>
      <Button
        className="mt-8 h-11 w-full rounded-full bg-white font-sans text-black hover:bg-white/90"
        type="button"
      >
        {t("Submit")}
      </Button>
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
