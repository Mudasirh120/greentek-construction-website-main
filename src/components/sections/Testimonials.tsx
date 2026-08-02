"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

const reviews = [
  {
    name: "Dana J.",
    src: "/images/reviews/client-1.avif",
    words:
      "The team at GreenTek transformed our home with their solar installation. The process was seamless and the results exceeded our expectations.",
    title: "Home Owner",
    rating: 5,
  },
  {
    name: "Marcus T.",
    src: "/images/reviews/client-1.avif",
    words:
      "From consultation to installation, GreenTek made switching to solar effortless. Highly recommend their team.",
    title: "Business Owner",
    rating: 5,
  },
  {
    name: "Priya R.",
    src: "/images/reviews/client-1.avif",
    words:
      "Professional, punctual, and our energy bills dropped significantly within the first month.",
    title: "Home Owner",
    rating: 5,
  },
  {
    name: "Sam K.",
    src: "/images/reviews/client-1.avif",
    words:
      "Excellent communication throughout the whole project. Couldn't be happier with the results.",
    title: "Home Owner",
    rating: 5,
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-black/40 backdrop-blur-[2px] border border-[#c5eb02]/60 rounded-xl px-4 md:px-6 py-2 md:py-4 mx-3">
      <div className="flex gap-4 py-2 md:py-4 items-center">
        <div>
          <Image
            src={review.src}
            alt={review.name}
            width={100}
            height={100}
            className="w-15 h-15 rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{review.name}</p>
          <p className="text-md text-white/70">{review.title}</p>
        </div>
      </div>
      <div className="my-3">
        <p className="text-white">{review.words}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-yellow-500 text-2xl">{"★".repeat(review.rating)}</p>
        <p>Job Satisfaction</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerFade = useFadeIn(0);
  // duplicate the list so the loop is seamless
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="bg-[url('/images/home-page/Solar-field-bg.avif')] bg-cover bg-center overflow-hidden">
      <div className="py-10 lg:py-14 bg-linear-to-b from-white to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          {/* Centered heading block */}
          <div
            ref={headerFade.ref}
            className={`text-center max-w-4xl mx-auto mb-10 md:mb-10 transition-all duration-700 ease-out ${
              headerFade.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-[10px] md:text-[16px] font-semibold uppercase tracking-[0.3em] mb-6 bg-[#28282C] text-[#c5eb02] rounded-xl px-3 py-1 w-fit mx-auto">
              Client Stories
            </p>
            <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-black">
              Trusted By Homeowners And Businesses Alike
            </h2>
            <p className="mt-4 text-lg md:text-xl text-black leading-relaxed text-center w-[70%] md:w-[80%] mx-auto font-medium">
              See how our renewable energy solutions are helping customers
              reduce costs, increase efficiency, and gain greater energy
              independence.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden group">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {marqueeReviews.map((review, idx) => (
                <ReviewCard key={`${review.name}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
