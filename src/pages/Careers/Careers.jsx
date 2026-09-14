import React, { useState } from "react";
import { useCareers } from "../../api/useCareers";
import {
  Camera,
  CheckCircle2,
  Clock,
  Heart,
  Mail,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import JobCard from "./JobCard";
import { BENEFITS as LOCAL_BENEFITS, HERO as LOCAL_HERO, JOBS as LOCAL_JOBS, OPEN_APPLICATION as LOCAL_OPEN_APPLICATION } from "./careersData";
import { useContent } from "../../api/useContent";

/**
 * Figma: Careers — 1550:9954 (positions list), 1550:10438 (a role expanded
 * with its application form) and 1550:10988 (application submitted). The three
 * frames are one page in three states, so this component drives them with
 * `openJob` and `submittedJob`.
 */
const ICONS = { Sparkles, TrendingUp, Clock, Wallet, Camera, Heart };

export default function Careers() {
  // Live copy from the backend, falling back to what this build shipped.
  const { content } = useContent("careers", { BENEFITS: LOCAL_BENEFITS, HERO: LOCAL_HERO, OPEN_APPLICATION: LOCAL_OPEN_APPLICATION });
  const { BENEFITS, HERO, OPEN_APPLICATION } = content;
  // Postings are records now, managed in the CRM; the rest is page copy.
  const { jobs: JOBS } = useCareers(LOCAL_JOBS);

  /**
   * Open roles is the live count, not a number typed into the copy. The two
   * invented hero stats ("12 Team Members", a hardcoded "4 Open Roles") are
   * filtered out by label as well as removed from the bundled copy, because
   * the CMS block still serves the seeded versions of both.
   */
  const roleStat = {
    value: String(JOBS.length),
    label: JOBS.length === 1 ? "Open Role" : "Open Roles",
  };
  const stats = [
    roleStat,
    ...(HERO.stats ?? []).filter(
      ({ label }) => !/^(open roles?|team members?)$/i.test(String(label).trim())
    ),
  ];

  const [openJob, setOpenJob] = useState(null);
  const [submittedJob, setSubmittedJob] = useState(null);

  const toggleJob = (id) => {
    setSubmittedJob(null);
    setOpenJob((current) => (current === id ? null : id));
  };

  // Keep the reference the backend assigns, so the confirmation can quote it.
  const handleSubmitted = (id, applicationNumber) => {
    setOpenJob(null);
    setSubmittedJob({ id, applicationNumber });
  };

  return (
    <SiteLayout active="Careers">
      {/* Hero */}
      <section className="flex w-full flex-col items-center bg-[#1f2937] px-6 pt-20 pb-16 md:pt-36">
        <div className="flex w-full max-w-[1440px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            {HERO.eyebrow}
          </p>
          <h1 className="pt-1 text-center text-[40px] leading-[44px] font-bold text-white md:text-[48px] md:leading-[48px]">
            {HERO.title}
          </h1>
          <p className="w-[576px] max-w-full pt-4 text-center text-[16px] leading-6 text-[rgba(255,255,255,0.5)] sm:text-[18px] sm:leading-7">
            {HERO.subtitle}
          </p>

          <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6 pt-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <p className="text-center text-[24px] leading-8 font-bold whitespace-nowrap text-[#f9a825]">
                  {value}
                </p>
                <p className="pt-1 text-center text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.5)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="flex w-full flex-col items-center bg-white px-6 py-16">
        <div className="flex w-full max-w-[900px] flex-col items-start">
          <h2 className="w-full text-center text-[24px] leading-8 font-bold text-[#1f2937]">
            Why Work With Us?
          </h2>

          <div className="grid w-full grid-cols-1 gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(({ icon, title, description }) => {
              const Icon = ICONS[icon];
              return (
                <div
                  key={title}
                  className="flex flex-col items-start rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(249,168,37,0.1)]">
                    <Icon className="size-5 text-[#f9a825]" strokeWidth={1.666} />
                  </span>
                  <h3 className="pt-3 text-[14px] leading-[20px] font-bold text-[#1f2937]">
                    {title}
                  </h3>
                  <p className="pt-1 text-[14px] leading-[20px] text-[#6a7282]">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="flex w-full flex-col items-center bg-white px-6 pb-16">
        <div className="flex w-full max-w-[900px] flex-col items-start">
          <h2 className="text-[24px] leading-8 font-bold text-[#1f2937]">
            Open Positions
          </h2>

          <div className="flex w-full flex-col items-start gap-4 pt-8">
            {JOBS.map((job) =>
              submittedJob?.id === job.id ? (
                <div
                  key={job.id}
                  className="flex w-full flex-col items-center rounded-2xl border-[0.701px] border-solid border-[#f3f4f6] bg-white px-6 py-10 text-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                >
                  <CheckCircle2
                    className="size-12 text-[#22c55e]"
                    strokeWidth={1.5}
                  />
                  <p className="pt-4 text-[20px] leading-7 font-bold text-[#1f2937]">
                    Application Submitted!
                  </p>
                  <p className="pt-2 text-[14px] leading-[22.75px] text-[#6a7282]">
                    Thanks for applying to {job.title}. Our team will get back to
                    you within 3 working days.
                  </p>
                  {submittedJob.applicationNumber && (
                    <p className="pt-3 text-[13px] leading-[18px] text-[#6a7282]">
                      Your reference is{" "}
                      <strong className="font-bold text-[#1f2937]">
                        {submittedJob.applicationNumber}
                      </strong>
                      . We've emailed you a copy.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmittedJob(null)}
                    className="mt-6 cursor-pointer rounded-[20px] border-[1.402px] border-solid border-[#f9a825] px-5 py-[10px] text-[14px] leading-[20px] font-bold text-[#f9a825] transition-colors hover:bg-[#f9a825]/10"
                  >
                    Back to Open Positions
                  </button>
                </div>
              ) : (
                <JobCard
                  key={job.id}
                  job={job}
                  isOpen={openJob === job.id}
                  onToggle={toggleJob}
                  onSubmitted={handleSubmitted}
                />
              )
            )}
          </div>

          {/* Don't see your role? */}
          <div className="mt-10 flex w-full flex-col items-center rounded-2xl bg-[#1f2937] px-6 py-8 text-center">
            <p className="text-[16px] leading-6 font-bold text-white">
              {OPEN_APPLICATION.title}
            </p>
            <p className="pt-1 text-[14px] leading-[20px] text-[rgba(255,255,255,0.5)]">
              {OPEN_APPLICATION.subtitle}
            </p>
            <a
              href={`mailto:${OPEN_APPLICATION.email}`}
              className="mt-4 flex max-w-full cursor-pointer items-center gap-2 rounded-[20px] bg-[#f9a825] px-6 py-3 text-[14px] leading-[20px] font-bold break-all text-[#1f2937] transition-colors hover:bg-[#e69a1f]"
            >
              <Mail className="size-4 shrink-0" strokeWidth={1.666} />
              Email {OPEN_APPLICATION.email}
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
