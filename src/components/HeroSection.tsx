import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
            Discover Local{" "}
            <span className="gradient-warm-text">Businesses</span>
            <br />Near You
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Book appointments, explore services, and connect with the best local businesses in your community.
          </p>

          {/* Search Bar */}
          <div className="bg-card rounded-2xl shadow-card p-2 flex flex-col md:flex-row gap-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search for services, businesses..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Your location"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <Button variant="hero" size="lg" className="md:px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Popular searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Hair Salon", "Clinic", "Restaurant", "Yoga"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 text-sm font-medium bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
