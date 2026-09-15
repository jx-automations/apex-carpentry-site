"use client";

import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingQuoteCTA from "@/components/layout/FloatingQuoteCTA";
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import WhyApex from "@/components/sections/WhyApex";
import Process from "@/components/sections/Process";
import QuoteEstimator from "@/components/sections/QuoteEstimator";
import Contact from "@/components/sections/Contact";
import SocialProof from "@/components/sections/SocialProof";
import { EstimatorContextProvider } from "@/lib/estimator/EstimatorContext";

export default function Home() {
  const heroSentinelRef = useRef<HTMLElement | null>(null);

  return (
    <EstimatorContextProvider>
      <Header />
      <main>
        <Hero sentinelRef={heroSentinelRef} />
        <Positioning />
        <Services />
        <FeaturedWork />
        <Gallery />
        <About />
        <WhyApex />
        <Process />
        <QuoteEstimator />
        <Contact />
        <SocialProof />
      </main>
      <Footer />
      <FloatingQuoteCTA heroSentinelRef={heroSentinelRef} />
    </EstimatorContextProvider>
  );
}
