"use client";

import { FormEvent, useEffect, useState } from "react";
import { ESTIMATOR_QUESTIONS } from "@/lib/estimator/questions";
import { useEstimatorContext } from "@/lib/estimator/EstimatorContext";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  details: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  details: "",
};

type Status = "idle" | "submitting" | "success" | "error";

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.details.trim()) errors.details = "Tell us a little about the project.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const { prefill } = useEstimatorContext();

  useEffect(() => {
    if (!prefill) return;
    // Sync from the estimator's external context only when it changes (the
    // user completed the estimator and clicked "Request a Quote"), not on
    // every render, so this is a legitimate external-store sync rather than
    // a derived-state anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({
      ...prev,
      projectType: prefill.projectType ?? prev.projectType,
      location: prefill.location ?? prev.location,
      details: prev.details
        ? prev.details
        : [
            prefill.projectType && `Project: ${prefill.projectType}`,
            prefill.propertyType && `Property type: ${prefill.propertyType}`,
            prefill.stage && `Stage: ${prefill.stage}`,
            prefill.timeline && `Timeline: ${prefill.timeline}`,
          ]
            .filter(Boolean)
            .join("\n"),
    }));
  }, [prefill]);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, projectType: true, location: true, details: true });
    if (hasErrors) return;

    setStatus("submitting");
    // No backend exists yet for this concept site. Simulate the request
    // lifecycle so the interaction reads correctly, without ever claiming a
    // real submission occurred.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <section id="contact" className="bg-[var(--color-ink)] text-[var(--color-paper)] py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-4 sm:px-8 text-center">
          <h2 className="font-display text-3xl mb-4">Details Ready to Send</h2>
          <p className="text-[var(--color-paper)]/70 leading-relaxed">
            This is a concept site and isn&apos;t yet connected to a live
            enquiry inbox, so nothing has actually been sent. Once connected,
            your message will land directly with Apex Carpentry.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY_FORM);
              setTouched({});
              setStatus("idle");
            }}
            className="mt-8 inline-flex items-center border border-[var(--color-paper)]/40 px-6 py-3 text-sm tracking-wide hover:bg-white/10 transition-colors cursor-pointer"
          >
            Start Another Enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="dark-section bg-[var(--color-ink)] text-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Start a Conversation"
            align="center"
            dark
            className="mx-auto"
          />
          <p className="mt-4 text-center text-[var(--color-paper)]/70 max-w-md mx-auto">
            Tell Apex Carpentry about your project and the team will get back
            to you.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field
                label="Name"
                htmlFor="name"
                error={touched.name ? errors.name : undefined}
              >
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  className={inputClass(!!(touched.name && errors.name))}
                />
              </Field>

              <Field
                label="Email"
                htmlFor="email"
                error={touched.email ? errors.email : undefined}
              >
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  className={inputClass(!!(touched.email && errors.email))}
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Phone (optional)" htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field label="Project Type" htmlFor="projectType">
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={(e) => handleChange("projectType", e.target.value)}
                  className={inputClass(false)}
                >
                  <option value="">Select an option</option>
                  {ESTIMATOR_QUESTIONS[0].options!.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Project Location" htmlFor="location">
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. Mount Eden, Auckland"
                className={inputClass(false)}
              />
            </Field>

            <Field
              label="Project Details"
              htmlFor="details"
              error={touched.details ? errors.details : undefined}
            >
              <textarea
                id="details"
                rows={5}
                value={form.details}
                onChange={(e) => handleChange("details", e.target.value)}
                onBlur={() => handleBlur("details")}
                aria-describedby={touched.details && errors.details ? "details-error" : undefined}
                className={inputClass(!!(touched.details && errors.details))}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[var(--color-paper)] text-[var(--color-ink)] px-8 py-4 text-sm tracking-wide font-medium hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "submitting" ? "Sending..." : "Request a Quote"}
            </button>

            {status === "error" && (
              <p role="alert" className="text-sm text-[var(--color-error)]">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3.5 bg-transparent border ${
    hasError ? "border-[var(--color-error)]" : "border-[var(--color-paper)]/25"
  } text-[var(--color-paper)] placeholder:text-[var(--color-paper)]/40 focus:border-[var(--color-paper)] outline-none transition-colors`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-[var(--color-paper)]/70 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
