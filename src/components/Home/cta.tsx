import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section id="cta" className="relative flex min-h-[300px] items-center justify-center overflow-hidden py-16 md:aspect-[1440/440] md:min-h-0 md:py-0">
      <Image
        src="/image/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h2 className="text-4xl font-light tracking-tight text-white md:text-[2.5rem]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-[15px] text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="mt-8 inline-flex h-14 items-center gap-6 bg-white px-8 text-xs font-semibold tracking-[0.14em] text-neutral-950 uppercase transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  )
}
