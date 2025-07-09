import React from "react";
import Link from "next/link";
import { CTAProps } from "../model/component-props/cta-model";

export default function CTA({ cta }: { cta: CTAProps }) {
  const page = cta?.page_reference?.[0];
  const url = page?.url;
  const title = cta?.cta_title || "Learn More";

  if (!url) return null;

  return (
    <div className="container my-10 m-auto px-5 md:px-0">
      <Link
        href={url}
        rel={cta.open_in_new_tab ? "noopener noreferrer" : undefined}
        target={cta.open_in_new_tab ? "_blank" : "_self"}
        className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
      >
        {title}
      </Link>
    </div>
  );
}
