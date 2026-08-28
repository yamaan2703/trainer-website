"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactPage, site } from "@/lib/content";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas/contact";
import { useZodForm } from "@/hooks/use-zod-form";
import { FieldShell, TextAreaField, TextField } from "@/components/ui/field";
import { EASE_OUT } from "@/lib/animations/motion-variants";

type FormStatus = "idle" | "submitting" | "success" | "error";

const copy = contactPage.form;

function buildMailto({ name, email, phone, subject, message }: ContactFormValues) {
  const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, "", message].join(
    "\n"
  );

  const params = new URLSearchParams({
    subject: `[Contact] ${subject}`,
    body,
  });

  return `${site.emailHref.split("?")[0]}?${params.toString()}`;
}

interface ContactFormProps {
  /** Hide the form’s own heading when a parent section already supplies one. */
  compact?: boolean;
}

/**
 * Contact form — transparent shell on the page surface, soft hairline fields.
 */
export function ContactForm({ compact = false }: ContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm(contactFormSchema, {
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      window.location.href = buildMailto(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="flex min-h-[24rem] flex-col justify-center bg-transparent py-6 sm:py-8"
        role="status"
      >
        <p className="inline-flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          <span className="size-1.5 bg-orange-600" aria-hidden />
          {copy.successTitle}
        </p>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-ink sm:text-lg">
          {copy.successBody}
        </p>
        <button
          type="button"
          className="btn-cta mt-10 w-fit px-6 py-3 text-xs"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      noValidate
      onSubmit={onSubmit}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
      className="bg-transparent py-2 sm:py-4"
      aria-busy={status === "submitting"}
      aria-label={compact ? "Send a message" : undefined}
    >
      {compact ? null : (
        <header className="mb-8 border-b border-hairline pb-6 sm:mb-9">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-orange-600">
            Discovery Call
          </p>
          <h2 className="mt-2 text-[1.35rem] font-black uppercase leading-tight tracking-tight text-ink sm:text-2xl">
            Send a message
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
            Tell us a little about your goals — we&apos;ll follow up personally.
          </p>
        </header>
      )}

      <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
        <FieldShell
          label={copy.nameLabel}
          htmlFor="contact-name"
          error={errors.name?.message}
          errorId="contact-name-error"
        >
          <TextField
            id="contact-name"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            hasError={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </FieldShell>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
          <FieldShell
            label={copy.emailLabel}
            htmlFor="contact-email"
            error={errors.email?.message}
            errorId="contact-email-error"
          >
            <TextField
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={copy.emailPlaceholder}
              hasError={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              {...register("email")}
            />
          </FieldShell>

          <FieldShell
            label={copy.phoneLabel}
            htmlFor="contact-phone"
            error={errors.phone?.message}
            errorId="contact-phone-error"
          >
            <TextField
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder={copy.phonePlaceholder}
              hasError={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              {...register("phone")}
            />
          </FieldShell>
        </div>

        <FieldShell
          label={copy.subjectLabel}
          htmlFor="contact-subject"
          error={errors.subject?.message}
          errorId="contact-subject-error"
        >
          <TextField
            id="contact-subject"
            autoComplete="off"
            placeholder={copy.subjectPlaceholder}
            hasError={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            {...register("subject")}
          />
        </FieldShell>

        <FieldShell
          label={copy.messageLabel}
          htmlFor="contact-message"
          error={errors.message?.message}
          errorId="contact-message-error"
        >
          <TextAreaField
            id="contact-message"
            rows={5}
            placeholder={copy.messagePlaceholder}
            hasError={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            {...register("message")}
          />
        </FieldShell>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-orange-600/90">
          {copy.errorBody}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-cta mt-7 w-full px-6 py-3.5 text-xs disabled:opacity-60"
      >
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>

      <p className="mt-4 text-center text-[0.65rem] tracking-wide text-ink-muted">
        We usually reply within one business day.
      </p>
    </motion.form>
  );
}
