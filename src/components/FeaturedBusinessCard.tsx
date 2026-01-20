import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShopStatus, { ShopStatusType } from "./ShopStatus";
import AppointmentBookingModal from "./AppointmentBookingModal";

interface FeaturedBusinessCardProps {
  id?: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  status: ShopStatusType;
  delay?: number;
}

const FeaturedBusinessCard = ({
  id,
  name,
  category,
  rating,
  reviewCount,
  image,
  location,
  status,
  delay = 0,
}: FeaturedBusinessCardProps) => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleViewProfile = () => {
    const businessSlug = id || name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/business/${businessSlug}`);
  };

  return (
    <>
      <div 
        className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in-up"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button className="absolute top-3 right-3 w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
            <Heart className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </button>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-card/90 backdrop-blur-sm">
            <ShopStatus status={status} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="hero-outline" 
              size="sm" 
              className="flex-1"
              onClick={handleViewProfile}
            >
              View Profile
            </Button>
            <Button
              variant="hero" 
              size="sm" 
              className="flex-1"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <AppointmentBookingModal
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        businessName={name}
        category={category}
      />
    </>
  );
};

export default FeaturedBusinessCard;
