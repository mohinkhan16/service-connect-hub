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
    name: "Dr. Smith's Family Clinic",
    category: "Clinic",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
    location: "Medical District, 1.2 mi",
    status: "busy",
    description: "Your trusted healthcare partner offering comprehensive medical services with experienced doctors and modern facilities.",
    phone: "+91 98765 12345",
    website: "www.drsmithclinic.com",
    hours: "9:00 AM - 6:00 PM",
    services: [
      { name: "General Consultation", price: "₹500", duration: "30 min" },
      { name: "Health Checkup", price: "₹2,000", duration: "1 hr" },
      { name: "Vaccination", price: "₹800", duration: "15 min" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400",
    ],
    reviews: [
      { user: "Amit K.", rating: 5, comment: "Very professional doctors and clean facility.", date: "3 days ago" },
    ],
  },
  "bella-italia": {
    id: "bella-italia",
    name: "Bella Italia Ristorante",
    category: "Italian Cuisine",
    rating: 4.7,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    location: "Little Italy, 2.1 mi",
    status: "closed",
    description: "Authentic Italian dining experience with handmade pasta, wood-fired pizzas, and an extensive wine selection. Our chefs bring the flavors of Italy to your table.",
    phone: "+91 98765 67890",
    website: "www.bellaitalia.com",
    hours: "12:00 PM - 11:00 PM",
    services: [
      { name: "Lunch Special", price: "₹599", duration: "1 hr" },
      { name: "Dinner Reservation", price: "₹1,500", duration: "2 hrs" },
      { name: "Private Dining", price: "₹5,000", duration: "3 hrs" },
      { name: "Catering Service", price: "₹10,000", duration: "Varies" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    ],
    reviews: [
      { user: "Maria L.", rating: 5, comment: "Best Italian food in the city! The pasta is divine.", date: "1 day ago" },
      { user: "John D.", rating: 4, comment: "Great ambiance and friendly staff. Pizza was excellent.", date: "5 days ago" },
    ],
  },
  "zen-yoga": {
    id: "zen-yoga",
    name: "Zen Yoga Studio",
    category: "Yoga & Meditation",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    location: "Westside, 0.5 mi",
    status: "open",
    description: "Find your inner peace at Zen Yoga Studio. We offer a variety of yoga styles, meditation sessions, and wellness workshops led by certified instructors.",
    phone: "+91 98765 11111",
    website: "www.zenyogastudio.com",
    hours: "6:00 AM - 9:00 PM",
    services: [
      { name: "Drop-in Class", price: "₹400", duration: "1 hr" },
      { name: "Monthly Membership", price: "₹3,000", duration: "Unlimited" },
      { name: "Private Session", price: "₹1,500", duration: "1 hr" },
      { name: "Meditation Workshop", price: "₹800", duration: "2 hrs" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400",
    ],
    reviews: [
      { user: "Sarah P.", rating: 5, comment: "Absolutely love this studio! The instructors are amazing.", date: "2 days ago" },
      { user: "Ravi T.", rating: 5, comment: "Perfect place to destress. Highly recommend the meditation classes.", date: "1 week ago" },
    ],
  },
  "spice-junction": {
    id: "spice-junction",
    name: "Spice Junction Restaurant",
    category: "Restaurants",
    rating: 4.6,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    location: "Food Street, 1.5 mi",
    status: "open",
    description: "Multi-cuisine restaurant serving authentic Indian, Chinese, and Continental dishes. Known for our signature spicy curries and sizzling platters.",
    phone: "+91 98765 22222",
    website: "www.spicejunction.in",
    hours: "11:00 AM - 11:00 PM",
    services: [
      { name: "Buffet Lunch", price: "₹450", duration: "Unlimited" },
      { name: "Buffet Dinner", price: "₹550", duration: "Unlimited" },
      { name: "Party Hall Booking", price: "₹15,000", duration: "4 hrs" },
      { name: "Home Delivery", price: "₹100+", duration: "45 min" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    ],
    reviews: [
      { user: "Deepak R.", rating: 5, comment: "Best butter chicken in town! Must try their biryani too.", date: "1 day ago" },
      { user: "Sneha M.", rating: 4, comment: "Great variety in buffet. Value for money.", date: "4 days ago" },
    ],
  },
  "quick-fix-repairs": {
    id: "quick-fix-repairs",
    name: "Quick Fix Electronics",
    category: "Repair & Service",
    rating: 4.7,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    location: "Tech Lane, 0.8 mi",
    status: "open",
    description: "Expert repair services for all electronics - mobiles, laptops, TVs, and home appliances. Same-day service available with genuine spare parts and warranty.",
    phone: "+91 98765 33333",
    website: "www.quickfixrepairs.com",
    hours: "9:00 AM - 8:00 PM",
    services: [
      { name: "Mobile Screen Repair", price: "₹1,500", duration: "2 hrs" },
      { name: "Laptop Service", price: "₹800", duration: "1 day" },
      { name: "AC Repair", price: "₹500", duration: "2 hrs" },
      { name: "TV Repair", price: "₹600", duration: "1 day" },
      { name: "Home Visit", price: "₹200", duration: "Add-on" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    ],
    reviews: [
      { user: "Vikram S.", rating: 5, comment: "Fixed my phone in just 1 hour! Excellent service.", date: "2 days ago" },
      { user: "Anita P.", rating: 5, comment: "Very honest pricing. Recommended for laptop repairs.", date: "1 week ago" },
    ],
  },
  "meera-home-kitchen": {
    id: "meera-home-kitchen",
    name: "Meera's Home Kitchen",
    category: "Home Business",
    rating: 4.9,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    location: "Your Neighborhood",
    status: "open",
    description: "Authentic home-cooked meals made with love! Specializing in North Indian thalis, fresh rotis, and homemade pickles. Daily tiffin service available for offices and homes. All meals prepared in a hygienic home kitchen with fresh ingredients.",
    phone: "+91 98765 44444",
    website: "wa.me/919876544444",
    hours: "8:00 AM - 9:00 PM",
    services: [
      { name: "Daily Tiffin (Veg)", price: "₹100/meal", duration: "Subscription" },
      { name: "Daily Tiffin (Non-Veg)", price: "₹150/meal", duration: "Subscription" },
      { name: "Special Thali", price: "₹180", duration: "Per order" },
      { name: "Party Orders (50+ pax)", price: "₹120/plate", duration: "Advance booking" },
      { name: "Homemade Pickles", price: "₹250/kg", duration: "Fresh weekly" },
      { name: "Festival Sweets", price: "₹400/kg", duration: "Pre-order" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400",
      "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
    ],
    reviews: [
      { user: "Ramesh K.", rating: 5, comment: "Just like mom's cooking! Been ordering daily tiffin for 6 months.", date: "1 day ago" },
      { user: "Priya N.", rating: 5, comment: "The pickle is amazing! Ordered 5kg for my relatives.", date: "3 days ago" },
      { user: "Office Team", rating: 5, comment: "Our entire office orders from Meera aunty. Best tiffin service!", date: "1 week ago" },
    ],
  },
  "stitch-perfect": {
    id: "stitch-perfect",
    name: "Stitch Perfect Tailoring",
    category: "Home Business",
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    location: "Home-based, Pickup Available",
    status: "busy",
    description: "Expert tailoring services from a home-based professional tailor with 20+ years experience. Specializing in blouse stitching, suit alterations, designer wear, and custom ethnic outfits. Free pickup and delivery within 5km.",
    phone: "+91 98765 55555",
    website: "wa.me/919876555555",
    hours: "10:00 AM - 7:00 PM",
    services: [
      { name: "Blouse Stitching", price: "₹400", duration: "3-4 days" },
      { name: "Suit/Salwar", price: "₹800", duration: "5-7 days" },
      { name: "Designer Blouse", price: "₹1,200", duration: "7-10 days" },
      { name: "Alterations", price: "₹150+", duration: "2 days" },
      { name: "Lehenga Stitching", price: "₹3,500", duration: "15 days" },
      { name: "Express Service", price: "+50%", duration: "24 hrs" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    ],
    reviews: [
      { user: "Kavita D.", rating: 5, comment: "Best blouse fitting ever! She understands exactly what you want.", date: "2 days ago" },
      { user: "Sunita M.", rating: 5, comment: "Got my wedding lehenga stitched. Absolutely perfect!", date: "1 week ago" },
    ],
  },
  "sharma-wholesale": {
    id: "sharma-wholesale",
    name: "Sharma Wholesale Mart",
    category: "Local Wholesaler",
    rating: 4.6,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    location: "Wholesale Market, 3.2 mi",
    status: "open",
    description: "Your one-stop wholesale destination for groceries, FMCG products, and daily essentials. Serving retailers, kirana stores, and bulk buyers for 25+ years. GST billing available. Minimum order: ₹5,000.",
    phone: "+91 98765 66666",
    website: "www.sharmawholesale.com",
    hours: "7:00 AM - 9:00 PM",
    services: [
      { name: "Grocery Items", price: "Wholesale rates", duration: "Same day" },
      { name: "FMCG Products", price: "10-30% off MRP", duration: "Same day" },
      { name: "Bulk Delivery (City)", price: "Free >₹10k", duration: "Next day" },
      { name: "Credit Line (Retailers)", price: "15-day credit", duration: "Approved accounts" },
      { name: "Festival Stock", price: "Special rates", duration: "Pre-book" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400",
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=400",
    ],
    reviews: [
      { user: "Rajesh Store", rating: 5, comment: "Best wholesale rates in the area. Reliable supply chain.", date: "1 day ago" },
      { user: "Gupta Kirana", rating: 4, comment: "Good variety and credit facility. Delivery could be faster.", date: "5 days ago" },
      { user: "New Mart", rating: 5, comment: "Been buying from them for 10 years. Very trustworthy.", date: "1 week ago" },
    ],
  },
  "textile-hub": {
    id: "textile-hub",
    name: "Textile Hub Wholesale",
    category: "Local Wholesaler",
    rating: 4.7,
    reviewCount: 289,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    location: "Textile Market, 4.1 mi",
    status: "open",
    description: "Premium wholesale fabric and textile supplier. Wide range of cotton, silk, polyester, and designer fabrics for retailers and boutiques. Direct manufacturer tie-ups ensure best prices. Sample cuts available.",
    phone: "+91 98765 77777",
    website: "www.textilehubwholesale.com",
    hours: "9:00 AM - 8:00 PM",
    services: [
      { name: "Cotton Fabrics", price: "₹80/meter+", duration: "Ready stock" },
      { name: "Silk Collection", price: "₹250/meter+", duration: "Ready stock" },
      { name: "Designer Prints", price: "₹120/meter+", duration: "Weekly new arrivals" },
      { name: "Bulk Order (1000m+)", price: "Extra 10% off", duration: "7-10 days" },
      { name: "Custom Print", price: "₹150/meter+", duration: "15-20 days" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400",
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    ],
    reviews: [
      { user: "Fashion Boutique", rating: 5, comment: "Best silk collection in town. Our customers love the quality.", date: "2 days ago" },
      { user: "Tailor Shop", rating: 5, comment: "Great cotton variety. Reasonable prices for retailers.", date: "1 week ago" },
    ],
  },
  "ritu-beauty-home": {
    id: "ritu-beauty-home",
    name: "Ritu's Home Beauty Services",
    category: "Home Business",
    rating: 4.9,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    location: "Home Visit Available",
    status: "open",
    description: "Professional beauty services at your doorstep! Certified beautician offering bridal makeup, facials, waxing, and mehendi. 10+ years experience with premium products. Book in advance for bridal packages.",
    phone: "+91 98765 88888",
    website: "wa.me/919876588888",
    hours: "9:00 AM - 8:00 PM (By appointment)",
    services: [
      { name: "Facial (Basic)", price: "₹500", duration: "45 min" },
      { name: "Facial (Premium)", price: "₹1,200", duration: "1 hr" },
      { name: "Full Body Waxing", price: "₹1,500", duration: "2 hrs" },
      { name: "Bridal Makeup", price: "₹8,000", duration: "3 hrs" },
      { name: "Mehendi (Both hands)", price: "₹2,000", duration: "2 hrs" },
      { name: "Party Makeup", price: "₹3,000", duration: "1.5 hrs" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400",
    ],
    reviews: [
      { user: "Neha B.", rating: 5, comment: "Did my bridal makeup. Everyone was asking which parlor I went to!", date: "3 days ago" },
      { user: "Pooja S.", rating: 5, comment: "So convenient! She comes home and the results are salon-quality.", date: "1 week ago" },
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
