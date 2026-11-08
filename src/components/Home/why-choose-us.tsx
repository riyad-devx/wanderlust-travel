import Image from "next/image"

const features = [
  {
    icon: "/image/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/image/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/image/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[#eaf7fc] pt-20 pb-12 font-serif">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-14">
        <div className="border border-dotted border-brand/60">
          <div className="px-6 pt-1 text-center">
            <h2 className="text-4xl font-medium tracking-tight text-neutral-950">
              Why Choose Wanderlust
            </h2>
            <p className="mt-1 text-[15px] text-neutral-600">
              Your trusted partner for exceptional travel experiences
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="bg-white p-8 pb-12">
                <Image
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="size-8"
                />
                <h3 className="mt-5 text-2xl font-medium text-neutral-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
