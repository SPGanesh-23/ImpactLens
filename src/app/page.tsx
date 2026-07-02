import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import DailyGoals from "@/components/home/DailyGoals";
import HowItWorks from "@/components/home/HowItWorks";
import Badges from "@/components/home/Badges";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DailyGoals />
        <HowItWorks />
        <Badges />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
