import { Button } from "@/components/ui/button";
import { Search, MapPin, Locate } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Search mapping for businesses
const searchableBusinesses = [
  { keywords: ["hair", "salon", "spa", "beauty", "haircut", "styling"], id: "glamour-studio", name: "Glamour Studio" },
  { keywords: ["clinic", "doctor", "medical", "health", "checkup"], id: "wellness-clinic", name: "Dr. Smith's Family Clinic" },
  { keywords: ["yoga", "meditation", "fitness", "wellness"], id: "zen-yoga", name: "Zen Yoga Studio" },
  { keywords: ["italian", "pizza", "pasta", "italy"], id: "bella-italia", name: "Bella Italia Ristorante" },
  { keywords: ["restaurant", "food", "dining", "lunch", "dinner", "biryani", "curry"], id: "spice-junction", name: "Spice Junction Restaurant" },
  { keywords: ["repair", "electronics", "mobile", "laptop", "tv", "ac", "fix"], id: "quick-fix-repairs", name: "Quick Fix Electronics" },
  { keywords: ["tiffin", "home food", "homemade", "kitchen", "meal", "thali", "pickle"], id: "meera-home-kitchen", name: "Meera's Home Kitchen" },
  { keywords: ["tailor", "stitching", "blouse", "alterations", "suits", "lehenga"], id: "stitch-perfect", name: "Stitch Perfect Tailoring" },
  { keywords: ["wholesale", "grocery", "bulk", "kirana", "fmcg"], id: "sharma-wholesale", name: "Sharma Wholesale Mart" },
  { keywords: ["textile", "fabric", "cloth", "cotton", "silk"], id: "textile-hub", name: "Textile Hub Wholesale" },
  { keywords: ["beauty", "makeup", "bridal", "facial", "waxing", "mehendi"], id: "ritu-beauty-home", name: "Ritu's Home Beauty Services" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedBusiness = searchableBusinesses.find(business =>
      business.keywords.some(keyword => query.includes(keyword))
    );

    if (matchedBusiness) {
      toast.success(`Found: ${matchedBusiness.name}`);
      navigate(`/business/${matchedBusiness.id}`);
    } else {
      toast.info("No exact match found. Showing popular results...");
      navigate(`/business/glamour-studio`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use reverse geocoding to get location name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          const locationName = data.address?.suburb || data.address?.city || data.address?.town || "Your Location";
          setLocation(locationName);
          toast.success(`Location set to: ${locationName}`);
        } catch {
          setLocation("Current Location");
          toast.success("Location detected!");
        }
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        toast.error("Unable to get your location. Please enter manually.");
        console.error(error);
      }
    );
  };

  const handlePopularSearch = (tag: string) => {
    setSearchQuery(tag);
    const query = tag.toLowerCase();
    const matchedBusiness = searchableBusinesses.find(business =>
      business.keywords.some(keyword => query.includes(keyword))
    );

    if (matchedBusiness) {
      toast.success(`Found: ${matchedBusiness.name}`);
      navigate(`/business/${matchedBusiness.id}`);
    }
  };

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
                onKeyPress={handleKeyPress}
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
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
                title="Get current location"
              >
                <Locate className={`h-4 w-4 text-primary ${isLocating ? "animate-pulse" : ""}`} />
              </button>
            </div>
            
            <Button variant="hero" size="lg" className="md:px-8" onClick={handleSearch}>
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
                onClick={() => handlePopularSearch(tag)}
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
