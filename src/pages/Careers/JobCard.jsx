import React, { useRef, useState } from "react";
import { applyForJob } from "../../api/endpoints";
import { ArrowRight, Clock, MapPin, Paperclip, Send, X } from "lucide-react";

/**
 * Figma: JobCard collapsed 1550:10098, expanded 1550:10582 with the
 * application form at 1550:10616.
 */
const EMPTY = { name: "", phone: "", email: "", about: "" };

export default function JobCard({ job, isOpen, onToggle, onSubmitted }) {
  const [values, setValues] = useState(EMPTY);
  const [resume, setResume] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const resumeInput = useRef(null);

  const handleChange = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  // The design greys the submit button out until the form carries content.
  const canSubmit =
    values.name.trim() && values.phone.trim() && values.email.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || sending) return;

    setSending(true);
    setError("");

    try {
      const result = await applyForJob(
        job.id,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          coverLetter: values.about,
        },
        resume
      );

      setValues(EMPTY);
      setResume(null);
      // The reference comes back so the candidate has something to quote.
      onSubmitted(job.id, result.applicationNumber);
    } catch (cause) {
      setError(cause.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <article className="w-full overflow-hidden rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      {/* Apply sits under the details on a phone, beside them from sm up. */}
      <div className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:justify-between sm:gap-6 sm:p-6">
        <div className="flex min-w-px flex-col items-start">
          <div className="flex flex-wrap items-center gap-2">
            {(job.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#fff7ed] px-[10px] py-1 text-[11px] leading-[15px] font-semibold whitespace-nowrap text-[#f9a825]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="pt-2 text-[20px] leading-7 font-bold text-[#1f2937]">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="flex items-center gap-2 text-[14px] leading-[20px] text-[#6a7282]">
              <MapPin className="size-[13.996px] shrink-0" strokeWidth={1.333} />
              {job.location}
            </span>
            <span className="flex items-center gap-2 text-[14px] leading-[20px] text-[#6a7282]">
              <Clock className="size-[13.996px] shrink-0" strokeWidth={1.333} />
              {job.commitment}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggle(job.id)}
          className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-[20px] bg-[#f9a825] px-5 text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:bg-[#e69a1f]"
        >
          {isOpen ? "Close" : "Apply"}
          {isOpen ? (
            <X className="size-4 shrink-0" strokeWidth={1.666} />
          ) : (
            <ArrowRight className="size-4 shrink-0" strokeWidth={1.666} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col items-start border-t-[0.701px] border-solid border-[#f3f4f6] p-5 sm:p-6">
          {job.description && (
            <p className="text-[14px] leading-[22.75px] text-[#6a7282]">
              {job.description}
            </p>
          )}

          {job.requirements.length > 0 && (
            <>
              <p className="pt-4 text-[12px] leading-4 font-bold tracking-[1.2px] text-[#1f2937] uppercase">
                What We're Looking For
              </p>
              <ul className="flex flex-col items-start gap-[6px] pt-2">
                {(job.requirements ?? []).map((requirement) => (
                  <li key={requirement} className="flex items-start gap-2">
                    <span className="text-[14px] leading-[20px] text-[#f9a825]">
                      ✦
                    </span>
                    <span className="text-[14px] leading-[20px] text-[#6a7282]">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <form onSubmit={handleSubmit} className="w-full pt-6">
            <p className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
              Submit Your Application
            </p>

            <div className="grid w-full grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Full name"
                className="h-[45.371px] w-full rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] text-[#1f2937] outline-none transition-colors placeholder:text-[rgba(31,41,55,0.5)] focus:border-[#f9a825]"
              />
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                autoComplete="tel"
                placeholder="Phone / WhatsApp"
                className="h-[45.371px] w-full rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] text-[#1f2937] outline-none transition-colors placeholder:text-[rgba(31,41,55,0.5)] focus:border-[#f9a825]"
              />
            </div>

            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Email address"
              className="mt-3 h-[45.371px] w-full rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] text-[#1f2937] outline-none transition-colors placeholder:text-[rgba(31,41,55,0.5)] focus:border-[#f9a825]"
            />

            <textarea
              name="about"
              value={values.about}
              onChange={handleChange}
              placeholder="Tell us about yourself & link to your portfolio (if applicable)..."
              className="mt-3 h-[85.343px] w-full resize-none rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] px-4 py-3 text-[14px] leading-[20px] text-[#1f2937] outline-none transition-colors placeholder:text-[rgba(31,41,55,0.5)] focus:border-[#f9a825]"
            />

            {/* The frame has no CV field, but a careers form without one sends
                the team a name and nothing to read. */}
            <input
              ref={resumeInput}
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(event) => setResume(event.target.files?.[0] || null)}
            />
            <button
              type="button"
              onClick={() => resumeInput.current?.click()}
              className="mt-3 flex max-w-full cursor-pointer items-center gap-2 rounded-[20px] border-[0.701px] border-dashed border-[#e5e7eb] px-4 py-3 text-left text-[13px] leading-[18px] font-semibold break-all text-[#6a7282] transition-colors hover:border-[#f9a825] hover:text-[#f9a825]"
            >
              <Paperclip className="size-4 shrink-0" strokeWidth={1.666} />
              {resume ? resume.name : "Attach your CV (PDF or Word)"}
            </button>

            {error && (
              <p className="pt-3 text-[12px] leading-4 font-semibold text-[#e7000b]">{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || sending}
              className={`mt-4 flex items-center gap-2 rounded-[20px] bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-opacity ${
                canSubmit && !sending ? "cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-50"
              }`}
            >
              <Send className="size-4 shrink-0" strokeWidth={1.666} />
              {sending ? "Sending…" : "Submit Application"}
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
