import { Search, Calendar, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import AppointmentBookingModal from "./AppointmentBookingModal";

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleDiscover = () => {
    // Scroll to hero section search
    const heroSection = document.querySelector('.hero-search');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus on search input
      const searchInput = heroSection.querySelector('input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 500);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    toast({
      title: "🔍 Start Discovering!",
      description: "Use the search bar to find local businesses",
    });
  };

  const handleBook = () => {
    setIsBookingOpen(true);
  };

  const handleConnect = () => {
    if (user) {
      navigate('/chat');
    } else {
      toast({
        title: "💬 Connect with Businesses",
        description: "Sign in to start chatting with local businesses",
      });
      navigate('/auth');
    }
  };

  const handleExperience = () => {
    // Navigate to a featured business to see reviews
    navigate('/business/glamour-studio');
    toast({
      title: "⭐ See Reviews",
      description: "Check out what others are saying!",
    });
  };

  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Search for local businesses by category, location, or service type.",
      action: handleDiscover,
      buttonText: "Start Search",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Book",
      description: "Schedule appointments directly through our easy-to-use booking system.",
      action: handleBook,
      buttonText: "Try Booking",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      description: "Chat with business owners, ask questions, and get instant responses.",
      action: handleConnect,
      buttonText: "Start Chat",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle,
      title: "Experience",
      description: "Enjoy quality services and share your reviews to help the community.",
      action: handleExperience,
      buttonText: "See Reviews",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-warm-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding and booking local services has never been easier. 
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="relative text-center animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              {/* Step card */}
              <div 
                onClick={step.action}
                className="cursor-pointer transition-all duration-300 hover:scale-105"
              >
                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-card group-hover:shadow-xl transition-shadow`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                
                {/* Action button */}
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn">
                  {step.buttonText}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal for demo */}
      <AppointmentBookingModal 
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        businessName="Sample Business"
        category="Hair Salon & Spa"
      />
    </section>
  );
};

export default HowItWorksSection;
