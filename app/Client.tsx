"use client";

import dynamic from "next/dynamic";
import LoadingComponent from "./_components/common/LoadingComponent";

const SignSection = dynamic(() => import("./_components/home/SignSection"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});
const SignDashboard = dynamic(
  () => import("./_components/home/SignDashboard"),
  {
    ssr: false,
  }
);
const Features = dynamic(() => import("./_components/home/Features"), {
  ssr: false,
});

const BriefCard = dynamic(() => import("./_components/home/BriefCard"), {
  ssr: false,
});
const MoreFeatures = dynamic(() => import("./_components/home/MoreFeatures"), {
  ssr: false,
});

const Packages = dynamic(() => import("./_components/home/Packages"), {
  ssr: false,
});
const Footer = dynamic(() => import("./_components/layout/Footer"), {
  ssr: false,
});

export default function ClientComponents() {
  return (
    <>
      <SignSection />
      <SignDashboard />
      <Features />
      <MoreFeatures />
      <Packages />
      <BriefCard />
      <Footer />
    </>
  );
}
