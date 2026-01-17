import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedSection from "@/components/FeaturedSection";
import PostsReelsSection from "@/components/PostsReelsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
        <PostsReelsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
