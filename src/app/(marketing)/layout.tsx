"use client";

import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 500,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Header />
      <main className="flex grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
