import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import JudgesPanel from "@/components/JudgesPanel";
import Leaderboard from "@/components/Leaderboard"; // New
import DiscoverMaps from "@/components/DiscoverMaps";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal selection:bg-chili selection:text-white">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <JudgesPanel />
      <Leaderboard />
      <DiscoverMaps />
      <Sponsors />
      <Footer />
    </main>
  );
}
