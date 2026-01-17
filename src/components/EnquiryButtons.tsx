import { Button } from "@/components/ui/button";
import { IndianRupee, Package, Truck, Clock, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface EnquiryButtonsProps {
  businessName: string;
  compact?: boolean;
}

const enquiryOptions = [
  { icon: IndianRupee, label: "Price pucho", message: "What is the price?" },
  { icon: Package, label: "Stock available?", message: "Is this item in stock?" },
  { icon: Truck, label: "Delivery available?", message: "Do you offer delivery?" },
  { icon: Clock, label: "Delivery time?", message: "What is the delivery time?" },
  { icon: ShoppingCart, label: "Order Now", message: "I want to order this", isPrimary: true },
];

const EnquiryButtons = ({ businessName, compact = false }: EnquiryButtonsProps) => {
  const handleEnquiry = (label: string, message: string) => {
    toast.success(`Enquiry sent to ${businessName}`, {
      description: message,
    });
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {enquiryOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => handleEnquiry(option.label, option.message)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              option.isPrimary
                ? "gradient-warm text-primary-foreground hover:scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <option.icon className="h-3.5 w-3.5" />
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {enquiryOptions.map((option) => (
        <Button
          key={option.label}
          variant={option.isPrimary ? "hero" : "secondary"}
          size="sm"
          onClick={() => handleEnquiry(option.label, option.message)}
          className="flex items-center gap-2"
        >
          <option.icon className="h-4 w-4" />
          <span className="truncate">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default EnquiryButtons;
