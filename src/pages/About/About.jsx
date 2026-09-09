import React from "react";
import { useApi } from "../../api/useApi";
import { fetchAbout } from "../../api/endpoints";
import { Link } from "react-router-dom";
import { Gem, Heart, MapPin, Smile, Users } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import { STATS as LOCAL_STATS, STORY as LOCAL_STORY, STUDIO as LOCAL_STUDIO, TEAM as LOCAL_TEAM, VALUES as LOCAL_VALUES } from "./aboutData";
import { useContent } from "../../api/useContent";
import studioHero from "./assets/studio-hero.jpg";

/**
 * Figma: Klicpic mithu / About (1550:9523)
 * Photo hero, story + stats, dark core-values band, team, studio, CTA.
 */
const ICONS = { heart: Heart, gem: Gem, smile: Smile, users: Users };

const HERO_SCRIM =
  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)";

export default function About() {
  // Live copy from the backend, falling back to what this build shipped.
  // About is its own record now; the block stays as the offline fallback.
  const { data: live } = useApi(fetchAbout, null, []);
  const { content } = useContent("about", { STORY: LOCAL_STORY, STATS: LOCAL_STATS, VALUES: LOCAL_VALUES, TEAM: LOCAL_TEAM, STUDIO: LOCAL_STUDIO });
  const STORY = live?.story?.length ? live.story : content.STORY;
  const STATS = live?.stats?.length ? live.stats : content.STATS;
  const VALUES = live?.values?.length ? live.values : content.VALUES;
  const TEAM = live?.team?.length ? live.team : content.TEAM;
  const STUDIO = live?.studio?.address ? live.studio : content.STUDIO;

  return (
    <SiteLayout
      announcement={{
        emoji: "🔥",
        message: "Only 7 weekend slots left for July — don't miss out!",
        cta: "Book →",
        activeDot: 2,
      }}
    >
      {/* hero */}
      <section className="relative min-h-[596.58px] w-full bg-[#101828]">
        <img
          src={studioHero}
          alt="Inside the Klicpic studio"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: HERO_SCRIM }} />
        <div className="relative flex min-h-[596.58px] w-full flex-col items-center justify-end px-6 pb-20">
          <p className="font-script pb-2 text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            Our Story
          </p>
          <h1 className="pb-4 text-center text-[40px] leading-[48px] font-bold text-white md:text-[60px] md:leading-[60px]">
            About Klicpic
          </h1>
          <p className="text-center text-[18px] leading-7 text-[rgba(255,255,255,0.7)]">
            A decade of turning fleeting moments into lifelong treasures.
          </p>
        </div>
      </section>

      {/* story + stats */}
      <section className="flex w-full flex-col items-center bg-white px-6 py-24">
        <div className="grid w-full max-w-[900px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <p className="text-[14px] leading-[20px] font-bold tracking-[1.4px] text-[#f9a825] uppercase">
              Since 2015
            </p>
            <h2 className="pt-3 text-[36px] leading-[45px] font-bold text-[#1f2937]">
              Born from a love for authentic moments
            </h2>
            {STORY.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[16px] leading-[26px] text-[#6a7282] ${index === 0 ? "pt-6" : "pt-4"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[rgba(249,168,37,0.07)] p-6"
              >
                <p className="text-center text-[30px] leading-9 font-bold whitespace-nowrap text-[#1f2937]">
                  {stat.value}
                </p>
                <p className="pt-1 text-center text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#99a1af]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="flex w-full flex-col items-center bg-[#1f2937] px-6 py-20">
        <div className="flex w-full max-w-[1100px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            What We Stand For
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-white">
            Our Core Values
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 pt-14 sm:grid-cols-2 xl:grid-cols-4">
            {VALUES.map((value) => {
              const Icon = ICONS[value.icon];
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-start rounded-2xl border-[0.701px] border-solid border-[rgba(249,168,37,0.15)] bg-[rgba(255,255,255,0.04)] p-6"
                >
                  <span className="flex size-[47.999px] shrink-0 items-center justify-center rounded-2xl bg-[rgba(249,168,37,0.1)]">
                    <Icon className="size-[23.994px] text-[#f9a825]" strokeWidth={1.666} />
                  </span>
                  <h3 className="pt-4 text-[18px] leading-[27px] font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="pt-2 text-[14px] leading-[22.75px] text-[rgba(255,255,255,0.5)]">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="flex w-full flex-col items-center bg-white px-6 py-24">
        <div className="flex w-full max-w-[1100px] flex-col items-center">
          <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
            The People Behind
          </p>
          <h2 className="pt-1 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
            Meet Our Team
          </h2>
          <div className="grid w-full grid-cols-1 gap-8 pt-14 sm:grid-cols-2 xl:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="size-[143.998px] shrink-0 rounded-full object-cover"
                />
                <h3 className="pt-4 text-center text-[18px] leading-[27px] font-bold text-[#1f2937]">
                  {member.name}
                </h3>
                <p className="text-center text-[14px] leading-[20px] font-medium text-[#f9a825]">
                  {member.role}
                </p>
                <p className="pt-2 text-center text-[12px] leading-4 text-[#99a1af] italic">
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* visit our studio */}
      <section className="flex w-full flex-col items-center bg-[#f9fafb] px-6 py-16">
        <div className="flex w-full max-w-[900px] flex-col items-center">
          <MapPin className="size-8 text-[#f9a825]" strokeWidth={1.666} />
          <h2 className="pt-4 text-center text-[30px] leading-9 font-bold text-[#1f2937]">
            Visit Our Studio
          </h2>
          <p className="pt-3 text-center text-[16px] leading-6 text-[#6a7282]">
            {STUDIO.address}
          </p>
          <p className="pt-2 text-center text-[14px] leading-[20px] text-[#99a1af]">
            {STUDIO.hours}
          </p>
        </div>
      </section>

      {/* closing CTA */}
      <section className="flex w-full flex-col items-center bg-white px-6 py-20">
        <p className="font-script text-center text-[30px] leading-9 font-normal whitespace-nowrap text-[#f9a825]">
          Ready to Create?
        </p>
        <h2 className="pt-2 text-center text-[36px] leading-10 font-bold text-[#1f2937]">
          Let's Make Your Memory
        </h2>
        <Link
          to="/book"
          className="mt-8 flex h-[60px] items-center justify-center rounded-2xl bg-[#f9a825] px-8 text-center text-[18px] leading-7 font-bold text-white transition-colors hover:bg-[#e69a1f]"
        >
          Book a Session →
        </Link>
      </section>
    </SiteLayout>
  );
}
