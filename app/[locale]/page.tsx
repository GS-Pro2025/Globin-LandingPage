// app/[locale]/page.tsx
import  Hero  from "../components/hero";
import { CountdownTimer } from "../components/CountdownTimer";
import { BetaForm } from "../components/BetaForm";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorks } from "../components/HowItWorks";
import { GlobalReach } from "../components/GlobalReach";
import { SecuritySection } from "../components/SecuritySection";
import { FinalCTA } from "../components/FinalCTA";

export default function Page() {
  return (
    <>
      <Hero />
      <CountdownTimer />
      <BetaForm />
      <FeaturesSection />
      <HowItWorks />
      <GlobalReach />
      <SecuritySection />
      <FinalCTA />
    </>
  );
}