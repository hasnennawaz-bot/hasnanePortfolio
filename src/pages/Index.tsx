import { lazy, Suspense } from "react";
import { portfolioData } from "@/lib/portfolio-data";

// Lazy load components for better performance
const Hero = lazy(() =>
  import("@/components/portfolio/Hero").then((module) => ({
    default: module.Hero,
  }))
);
const BeyondResume = lazy(() =>
  import("@/components/portfolio/BeyondResume").then((module) => ({
    default: module.BeyondResume,
  }))
);
const ImpactMetrics = lazy(() =>
  import("@/components/portfolio/ImpactMetrics").then((module) => ({
    default: module.ImpactMetrics,
  }))
);
const Experience = lazy(() =>
  import("@/components/portfolio/Experience").then((module) => ({
    default: module.Experience,
  }))
);
const WorkShowcase = lazy(() =>
  import("@/components/portfolio/WorkShowcase").then((module) => ({
    default: module.WorkShowcase,
  }))
);
const Skills = lazy(() =>
  import("@/components/portfolio/Skills").then((module) => ({
    default: module.Skills,
  }))
);
const SocialProof = lazy(() =>
  import("@/components/portfolio/SocialProof").then((module) => ({
    default: module.SocialProof,
  }))
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((module) => ({
    default: module.Contact,
  }))
);

// Loading fallback
const SectionLoader = () => (
  <div className="section-padding">
    <div className="h-64 bg-muted/10 animate-pulse rounded-lg" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Suspense fallback={<SectionLoader />}>
        <Hero
          personalInfo={portfolioData.personalInfo}
          profileSummary={portfolioData.profileSummary}
        />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BeyondResume data={portfolioData.beyondResume} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ImpactMetrics metrics={portfolioData.metrics} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Experience experiences={portfolioData.experience} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WorkShowcase works={portfolioData.workShowcase} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills skills={portfolioData.skills} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SocialProof pages={portfolioData.socialMediaPagesManagerOf} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact
          contact={portfolioData.personalInfo.contact}
          name={portfolioData.personalInfo.name}
        />
      </Suspense>
    </main>
  );
};

export default Index;
