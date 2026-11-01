// Testimonials, shown between About and Contact. RULE (CLAUDE.md): a
// testimonial goes in only word for word, with written permission recorded
// here with its date. Never invent, shorten or tidy a quote. Entries with
// permission false stay in the file and never render. With no permitted
// entries the section renders nothing and stays out of the navbar and footer.

export type Testimonial = {
  /** Word for word, exactly as written by the person. */
  quote: string;
  name: string;
  role: string;
  organisation: string;
  /** The project page it is about, e.g. "/projects/steadyhands". */
  projectHref: string;
  /** Written permission to publish this quote, with this name and role. */
  permission: boolean;
  /** ISO date the written permission was given, YYYY-MM-DD. */
  permissionDate: string | null;
};

export const TESTIMONIALS: Testimonial[] = [];

/** Only entries with written permission and a recorded date. */
export function publishedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.permission && t.permissionDate !== null);
}

export const HAS_TESTIMONIALS = publishedTestimonials().length > 0;
