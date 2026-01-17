import CategoryCard from "./CategoryCard";
import { 
  Stethoscope, 
  Scissors, 
  Leaf, 
  Utensils, 
  ChefHat, 
  Wrench, 
  Package, 
  Home 
} from "lucide-react";

const categories = [
  {
    title: "Clinic",
    description: "Medical clinics, dental care, and healthcare services",
    icon: Stethoscope,
    colorClass: "bg-category-clinic",
    businessCount: 2340,
  },
  {
    title: "Hair Salon & Spa",
    description: "Beauty salons, spas, and wellness treatments",
    icon: Scissors,
    colorClass: "bg-category-salon",
    businessCount: 1850,
  },
  {
    title: "Yoga & Meditation",
    description: "Yoga studios, meditation centers, and fitness classes",
    icon: Leaf,
    colorClass: "bg-category-yoga",
    businessCount: 920,
  },
  {
    title: "Italian Cuisine",
    description: "Authentic Italian restaurants and pizzerias",
    icon: Utensils,
    colorClass: "bg-category-food",
    businessCount: 680,
  },
  {
    title: "Restaurants",
    description: "Diverse dining options from casual to fine dining",
    icon: ChefHat,
    colorClass: "bg-category-restaurant",
    businessCount: 3200,
  },
  {
    title: "Repair & Service",
    description: "Electronics repair, auto service, and maintenance",
    icon: Wrench,
    colorClass: "bg-category-repair",
    businessCount: 1450,
  },
  {
    title: "Local Wholesalers",
    description: "Wholesale suppliers and bulk distributors",
    icon: Package,
    colorClass: "bg-category-wholesale",
    businessCount: 520,
  },
  {
    title: "Home Businesses",
    description: "Home-based services and local entrepreneurs",
    icon: Home,
    colorClass: "bg-category-home",
    businessCount: 1120,
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="gradient-warm-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a wide range of local businesses and services. Book appointments, 
            chat with providers, and discover what's available near you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              {...category}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
