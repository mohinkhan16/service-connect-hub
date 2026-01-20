import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Phone, Globe, Heart, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopStatus, { ShopStatusType } from "@/components/ShopStatus";
import AppointmentBookingModal from "@/components/AppointmentBookingModal";
import { useState } from "react";

// Mock data - in real app this would come from database
const mockBusinesses: Record<string, {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  status: ShopStatusType;
  description: string;
  phone: string;
  website: string;
  hours: string;
  services: { name: string; price: string; duration: string }[];
  gallery: string[];
  reviews: { user: string; rating: number; comment: string; date: string }[];
}> = {
  "glamour-studio": {
    id: "glamour-studio",
    name: "Glamour Studio",
    category: "Hair Salon & Spa",
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    location: "MG Road, Bangalore",
    status: "open",
    description: "Premium hair salon and spa offering the latest trends in hair styling, coloring, and wellness treatments. Our expert stylists ensure you leave looking and feeling your best.",
    phone: "+91 98765 43210",
    website: "www.glamourstudio.com",
    hours: "10:00 AM - 8:00 PM",
    services: [
      { name: "Haircut & Styling", price: "₹500", duration: "45 min" },
      { name: "Hair Coloring", price: "₹2,500", duration: "2 hrs" },
      { name: "Spa Treatment", price: "₹1,500", duration: "1 hr" },
      { name: "Bridal Makeup", price: "₹15,000", duration: "3 hrs" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400",
    ],
    reviews: [
      { user: "Priya S.", rating: 5, comment: "Amazing service! The staff is very professional.", date: "2 days ago" },
      { user: "Rahul M.", rating: 4, comment: "Great haircut, will definitely come back.", date: "1 week ago" },
    ],
  },
  "wellness-clinic": {
    id: "wellness-clinic",
    name: "Wellness Clinic",
    category: "Clinic",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    location: "Koramangala, Bangalore",
    status: "busy",
    description: "Your trusted healthcare partner offering comprehensive medical services with experienced doctors and modern facilities.",
    phone: "+91 98765 12345",
    website: "www.wellnessclinic.com",
    hours: "9:00 AM - 6:00 PM",
    services: [
      { name: "General Consultation", price: "₹500", duration: "30 min" },
      { name: "Health Checkup", price: "₹2,000", duration: "1 hr" },
      { name: "Vaccination", price: "₹800", duration: "15 min" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400",
    ],
    reviews: [
      { user: "Amit K.", rating: 5, comment: "Very professional doctors and clean facility.", date: "3 days ago" },
    ],
  },
};

const BusinessProfile = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get business data or use default
  const business = businessId && mockBusinesses[businessId] 
    ? mockBusinesses[businessId] 
    : mockBusinesses["glamour-studio"];

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
          </button>
          <button className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm">
            <ShopStatus status={business.status} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 pb-24">
        {/* Business Info Card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">{business.category}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="font-semibold text-foreground">{business.rating}</span>
                  <span>({business.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{business.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleStartChat}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="hero" size="sm" onClick={() => setIsBookingOpen(true)}>
                Book Now
              </Button>
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{business.description}</p>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours</p>
                <p className="font-medium">{business.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{business.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <p className="font-medium">{business.website}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
              {business.services.map((service, index) => (
                <div
                  key={service.name}
                  className={`p-4 flex items-center justify-between ${
                    index !== business.services.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">{service.price}</span>
                    <Button size="sm" variant="outline" onClick={() => setIsBookingOpen(true)}>
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {business.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden border border-border/50"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {business.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border/50 shadow-soft p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
                        {review.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-accent fill-accent" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 p-4 z-50">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleStartChat}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="hero" className="flex-1" onClick={() => setIsBookingOpen(true)}>
            Book Appointment
          </Button>
        </div>
      </div>

      <AppointmentBookingModal
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        businessName={business.name}
        category={business.category}
      />
    </div>
  );
};

export default BusinessProfile;
