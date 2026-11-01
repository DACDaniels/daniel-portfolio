import { ActivityGrid } from "@/components/ui/ActivityGrid";
import { getActivity } from "@/lib/githubActivity";

/**
 * "Shipping, every week": GitHub contribution grid, server-fetched once a
 * day. Renders nothing when the token is missing or the call fails.
 */
export async function ShippingGraph() {
  const weeks = await getActivity();
  if (!weeks) return null;
  return (
    <section
      aria-labelledby="shipping-title"
      className="mt-16 rounded-[16px] border border-border bg-bg-surface p-4 shadow-[0_24px_60px_-36px_rgba(0,229,192,0.18)] sm:p-6 md:mt-24 md:p-8"
    >
      <div className="mb-6 flex flex-col gap-1.5 md:mb-8">
        <h3
          id="shipping-title"
          className="font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-text-primary"
        >
          Shipping, every week
        </h3>
        <p className="text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
          GitHub activity over the last twelve months, private client work included.
        </p>
      </div>
      <ActivityGrid weeks={weeks} />
    </section>
  );
}
