import React, { useState } from "react";

/**
 * Figma: Klicpic mithu / Home — Save Your Dream Shoot (1550:3232)
 * Soft-gradient lead-capture card.
 */
const FIELDS = [
  { name: "name", type: "text", placeholder: "Your Name", autoComplete: "name" },
  { name: "phone", type: "tel", placeholder: "Phone Number", autoComplete: "tel" },
  { name: "whatsapp", type: "tel", placeholder: "WhatsApp Number", autoComplete: "tel" },
  { name: "email", type: "email", placeholder: "Email Address", autoComplete: "email" },
];

const EMPTY = { name: "", phone: "", whatsapp: "", email: "" };

export default function SaveShoot() {
  const [values, setValues] = useState(EMPTY);

  const handleChange = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = (event) => {
    // Wire this to the lead endpoint; the Figma frame specifies no destination.
    event.preventDefault();
  };

  return (
    <section className="flex w-full flex-col items-center bg-[#fafafa] px-6 py-24">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[576px] flex-col items-start rounded-3xl border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] p-14 shadow-[0px_20px_30px_rgba(249,168,37,0.08)]"
        style={{
          backgroundImage:
            "linear-gradient(133.98deg, rgb(255, 247, 237) 0%, rgb(255, 255, 255) 100%)",
        }}
      >
        <p className="w-full text-center font-script text-[36px] leading-10 font-normal text-[#f9a825]">
          Not Ready Yet?
        </p>
        <h2 className="w-full pt-1 text-center text-[30px] leading-9 font-bold text-[#1f2937]">
          Save Your Dream Shoot
        </h2>
        <p className="w-full pt-3 text-center text-[14px] leading-[20px] text-[#6a7282]">
          We will hold your preferences and reach out when you are ready — no
          pressure, ever.
        </p>

        <div className="flex w-full flex-col items-start gap-[14px] pt-8">
          {FIELDS.map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="h-[49.379px] w-full rounded-[20px] border-[0.701px] border-solid border-[#e5e7eb] bg-white px-5 py-[14px] text-[14px] text-[#1f2937] transition-colors outline-none placeholder:text-[#99a1af] focus:border-[#f9a825]"
            />
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 h-[55.994px] w-full cursor-pointer rounded-[20px] bg-[#f9a825] text-center text-[16px] leading-6 font-semibold text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e69a1f]"
        >
          Save &amp; Continue Later
        </button>
      </form>
    </section>
  );
}
