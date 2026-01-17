import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  businessCount: number;
  delay?: number;
}

const CategoryCard = ({ title, description, icon: Icon, colorClass, businessCount, delay = 0 }: CategoryCardProps) => {
  return (
    <div 
      className="category-card bg-card border border-border/50 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn("category-icon", colorClass)}>
        <Icon className="h-7 w-7" />
      </div>
      
      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs font-medium text-muted-foreground">
          {businessCount.toLocaleString()}+ businesses
        </span>
        <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Explore →
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
