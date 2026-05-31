import { ProductTourClient } from "./ProductTourClient";

export function ProductTour() {
  return (
    <section id="product" className="relative border-t border-stroke">
      {/* Section opener — scrolls away before the pinned tour begins */}
      <div className="shell py-24 text-center lg:py-32">
        <h2 className="mx-auto max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
          Record once. Train everyone.
          <br className="hidden sm:block" /> Solve everything.
        </h2>
      </div>

      {/* Scroll-driven progressive disclosure (desktop) / vertical stack (mobile) */}
      <ProductTourClient />
    </section>
  );
}
