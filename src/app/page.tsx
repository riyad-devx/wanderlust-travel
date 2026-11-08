import { Banner } from "@/components/Home/banner"
import { Cta } from "@/components/Home/cta"
import FeaturedDestinations from "@/components/Home/featured-destinations"
import { Testimonials } from "@/components/Home/testimonials"
import { WhyChooseUs } from "@/components/Home/why-choose-us"

export default function Home() {
  return (
    <>
      
      <main className="flex-1">
        <Banner />
        <FeaturedDestinations/>
        <WhyChooseUs />
        <Testimonials />
        <Cta />
      </main>
    </>
  )
}
