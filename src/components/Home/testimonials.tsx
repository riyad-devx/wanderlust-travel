import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/image/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/image/person1.png",
  },
  {
    quote:
      "Amalfi Coast Escape Was A Dream Come True. The Seaside Views, Charming Towns, And Effortless Planning Made It A Trip We Will Never Forget.",
    name: "Emma Wilson",
    location: "London, UK",
    image: "/image/person1.png",
  },
  {
    quote:
      "Iceland Northern Lights Tour Was Simply Spectacular. Our Guide Knew Every Hidden Spot And The Entire Journey Felt Seamless From Start To Finish.",
    name: "Daniel Lee",
    location: "Sydney, Australia",
    image: "/image/person2.png",
  },
  {
    quote:
      "Kyoto Cultural Journey Was Beautifully Curated. From Peaceful Temples To Incredible Local Food, Every Day Felt Thoughtful And Authentic.",
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: "/image/person1.png",
  },
  {
    quote:
      "Patagonia Trek Was Challenging In The Best Way. Stunning Landscapes, Expert Guidance, And Memories That Will Stay With Us Forever.",
    name: "Lucas Martin",
    location: "Paris, France",
    image: "/image/person2.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-14">
        <Carousel opts={{ align: "start" }} className="w-full">
          <div className="flex items-start justify-between gap-6">
            <div className="pr-24 sm:pr-0">
              <h2 className="text-4xl tracking-tight text-neutral-950 md:text-[2.5rem]">
                What Travelers Say
              </h2>
              <p className="mt-2 font-serif text-[15px] text-neutral-500">
                Real experiences from our happy travelers
              </p>
            </div>
          </div>

          <CarouselPrevious className="top-3 right-14 bottom-auto left-auto my-0 size-10 border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-700" />
          <CarouselNext className="top-3 right-0 bottom-auto left-auto my-0 size-10 border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-700" />

          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-6 md:basis-1/2"
              >
                <article className="grid h-full grid-cols-[1fr_38%] border border-neutral-200 bg-white p-3">
                  <div className="flex flex-col justify-between py-1.5 pl-4 pr-5">
                    <blockquote className="font-serif text-sm leading-[1.35] text-neutral-900">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="mt-6">
                      <p className="text-sm text-brand">
                        — {testimonial.name}
                      </p>
                      <p className="ml-4 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative aspect-[155/198] overflow-hidden bg-neutral-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 20vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
