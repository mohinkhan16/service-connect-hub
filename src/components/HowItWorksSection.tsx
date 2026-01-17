import { Search, Calendar, MessageCircle, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Search for local businesses by category, location, or service type.",
  },
  {
    icon: Calendar,
    title: "Book",
    description: "Schedule appointments directly through our easy-to-use booking system.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description: "Chat with business owners, ask questions, and get instant responses.",
  },
  {
    icon: CheckCircle,
    title: "Experience",
    description: "Enjoy quality services and share your reviews to help the community.",
  },
];

const HowItWorksSection = () => {
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
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div className="w-24 h-24 rounded-2xl gradient-warm flex items-center justify-center shadow-card">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
