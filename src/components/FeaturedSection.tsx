import FeaturedBusinessCard from "./FeaturedBusinessCard";

import { ShopStatusType } from "./ShopStatus";

const featuredBusinesses: Array<{
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  status: ShopStatusType;
}> = [
  {
    id: "glamour-studio",
    name: "Serenity Wellness Spa",
    category: "Hair Salon & Spa",
    rating: 4.9,
    reviewCount: 328,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    location: "Downtown, 0.8 mi",
    status: "open",
  },
  {
    id: "wellness-clinic",
    name: "Dr. Smith's Family Clinic",
    category: "Clinic",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
    location: "Medical District, 1.2 mi",
    status: "busy",
  },
  {
    id: "bella-italia",
    name: "Bella Italia Ristorante",
    category: "Italian Cuisine",
    rating: 4.7,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    location: "Little Italy, 2.1 mi",
    status: "closed",
  },
  {
    id: "zen-yoga",
    name: "Zen Yoga Studio",
    category: "Yoga & Meditation",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    location: "Westside, 0.5 mi",
    status: "open",
  },
];

const FeaturedSection = () => {
  return (
    <section id="featured" className="py-20 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-warm-text">Businesses</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Top-rated local businesses handpicked for their exceptional service and customer reviews.
            </p>
          </div>
          <a href="#" className="text-primary font-semibold hover:underline">
            View all businesses →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map((business, index) => (
            <FeaturedBusinessCard
              key={business.name}
              {...business}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
