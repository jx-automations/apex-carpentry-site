"use client";

import { useReducer, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ESTIMATOR_QUESTIONS } from "@/lib/estimator/questions";
import { estimatorReducer, initialEstimatorState, getResultMessage } from "@/lib/estimator/reducer";
import { StepId } from "@/lib/estimator/types";
import { useEstimatorContext } from "@/lib/estimator/EstimatorContext";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ADVANCE_DELAY = 220;

export default function QuoteEstimator() {
  const [state, dispatch] = useReducer(estimatorReducer, initialEstimatorState);
  const [locationDraft, setLocationDraft] = useState("");
  const stepRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { setPrefill } = useEstimatorContext();

  const question = ESTIMATOR_QUESTIONS[state.currentStep];

  useEffect(() => {
    const node = stepRef.current;
    if (!node) return;
    if (reduced) return;
    gsap.fromTo(node, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, [state.currentStep, state.completed, reduced]);

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = state.completed
        ? "Result ready"
        : `Step ${state.currentStep + 1} of ${ESTIMATOR_QUESTIONS.length}: ${question?.question ?? ""}`;
    }
  }, [state.currentStep, state.completed, question]);

  function selectAnswer(step: StepId, value: string) {
    // Small delay so the selection is visibly registered before advancing.
    setTimeout(() => dispatch({ type: "SELECT_ANSWER", step, value }), ADVANCE_DELAY);
  }

  function submitLocation() {
    if (!locationDraft.trim()) return;
    dispatch({ type: "SET_LOCATION", value: locationDraft.trim() });
  }

  function handleSendDetails() {
    setPrefill(state.answers);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="bg-[var(--color-paper-alt)] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Ballpark Estimator"
            title="Get a Sense of Scope"
            align="center"
            className="mx-auto"
          />
          <p className="mt-4 text-center text-[var(--color-charcoal)]/70 max-w-md mx-auto">
            Answer a few quick questions for a general sense of scope. This is
            a starting point for a conversation, not a fixed price.
          </p>
        </RevealOnScroll>

        <div className="mt-12 bg-[var(--color-paper)] border border-[var(--color-line)] p-6 sm:p-10">
          <div className="sr-only" role="status" aria-live="polite" ref={liveRegionRef} />

          {!state.completed && (
            <div className="flex gap-1.5 mb-8" aria-hidden="true">
              {ESTIMATOR_QUESTIONS.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-1 flex-1 rounded-full ${
                    i <= state.currentStep ? "bg-[var(--color-timber)]" : "bg-[var(--color-line)]"
                  }`}
                />
              ))}
            </div>
          )}

          {!state.completed ? (
            <div ref={stepRef} role="group" aria-label={question.question}>
              <h3 className="font-display text-2xl mb-6">{question.question}</h3>

              {question.type === "select" && (
                <div className="grid sm:grid-cols-2 gap-3" role="radiogroup">
                  {question.options!.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={state.answers[question.id] === opt.value}
                      onClick={() => selectAnswer(question.id, opt.value)}
                      className="text-left px-5 py-4 border border-[var(--color-line)] hover:border-[var(--color-timber)] hover:bg-[var(--color-timber)]/5 transition-colors cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {question.type === "text" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="estimator-location" className="sr-only">
                    Project location
                  </label>
                  <input
                    id="estimator-location"
                    type="text"
                    value={locationDraft}
                    onChange={(e) => setLocationDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitLocation()}
                    placeholder="e.g. Mount Eden, Auckland"
                    className="flex-1 px-5 py-4 border border-[var(--color-line)] focus:border-[var(--color-timber)] outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={submitLocation}
                    disabled={!locationDraft.trim()}
                    className="px-6 py-4 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              )}

              {state.currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "GO_BACK" })}
                  className="mt-6 text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] cursor-pointer"
                >
                  Back
                </button>
              )}
            </div>
          ) : (
            <div ref={stepRef} className="text-center py-4">
              <p className="font-display text-2xl mb-4">
                {getResultMessage(state.answers)}
              </p>
              <p className="text-xs text-[var(--color-charcoal)]/50 mb-8 max-w-sm mx-auto">
                Rough guide only. Not a formal quote. Final scope and pricing
                depend on the project, site conditions and materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleSendDetails}
                  className="inline-flex items-center justify-center bg-[var(--color-ink)] text-[var(--color-paper)] px-7 py-3.5 text-sm tracking-wide hover:bg-[var(--color-charcoal)] transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "GO_BACK" })}
                  className="text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] cursor-pointer"
                >
                  Edit answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
