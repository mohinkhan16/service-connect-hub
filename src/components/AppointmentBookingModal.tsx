import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, Scissors, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface AppointmentBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName: string;
  category: string;
}

const getServicesForCategory = (category: string): Service[] => {
  const servicesByCategory: Record<string, Service[]> = {
    "Hair Salon & Spa": [
      { id: "1", name: "Haircut", duration: "30 min", price: "₹300" },
      { id: "2", name: "Hair Coloring", duration: "90 min", price: "₹1500" },
      { id: "3", name: "Facial", duration: "45 min", price: "₹800" },
      { id: "4", name: "Massage", duration: "60 min", price: "₹1200" },
    ],
    "Clinic": [
      { id: "1", name: "General Consultation", duration: "15 min", price: "₹500" },
      { id: "2", name: "Health Checkup", duration: "45 min", price: "₹2000" },
      { id: "3", name: "Lab Tests", duration: "30 min", price: "₹800" },
      { id: "4", name: "Vaccination", duration: "15 min", price: "₹300" },
    ],
    "Yoga & Meditation": [
      { id: "1", name: "Yoga Class", duration: "60 min", price: "₹400" },
      { id: "2", name: "Private Session", duration: "45 min", price: "₹1000" },
      { id: "3", name: "Meditation", duration: "30 min", price: "₹300" },
      { id: "4", name: "Breathing Workshop", duration: "45 min", price: "₹500" },
    ],
    "Italian Cuisine": [
      { id: "1", name: "Table for 2", duration: "90 min", price: "Free" },
      { id: "2", name: "Table for 4", duration: "90 min", price: "Free" },
      { id: "3", name: "Private Dining", duration: "120 min", price: "₹1000" },
      { id: "4", name: "Chef's Table", duration: "150 min", price: "₹2500" },
    ],
    "Repair & Service": [
      { id: "1", name: "Phone Repair", duration: "30 min", price: "₹500" },
      { id: "2", name: "Laptop Repair", duration: "60 min", price: "₹800" },
      { id: "3", name: "Home Appliance", duration: "45 min", price: "₹600" },
      { id: "4", name: "AC Service", duration: "60 min", price: "₹1000" },
    ],
  };

  return servicesByCategory[category] || [
    { id: "1", name: "Consultation", duration: "30 min", price: "₹500" },
    { id: "2", name: "Standard Service", duration: "45 min", price: "₹800" },
    { id: "3", name: "Premium Service", duration: "60 min", price: "₹1200" },
    { id: "4", name: "Custom Service", duration: "varies", price: "On Quote" },
  ];
};

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
];

const AppointmentBookingModal = ({
  open,
  onOpenChange,
  businessName,
  category,
}: AppointmentBookingModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services = getServicesForCategory(category);

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      handleReset();
    }
    onOpenChange(open);
  };

  const handleConfirmBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      toast.success("Appointment Booked!", {
        description: `${selectedService.name} at ${businessName} on ${format(selectedDate, "PPP")} at ${selectedTime}`,
      });
      handleClose(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" />
              Select Service
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setStep(2);
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                    "hover:border-primary hover:bg-primary/5",
                    selectedService?.id === service.id
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  )}
                >
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <span className="font-bold text-primary">{service.price}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Select Date
            </h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (date) setStep(3);
                }}
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                className="rounded-xl border pointer-events-auto"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Select Time Slot
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => {
                // Randomly disable some slots to simulate availability
                const isAvailable = Math.random() > 0.3;
                return (
                  <button
                    key={time}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedTime(time);
                        setStep(4);
                      }
                    }}
                    disabled={!isAvailable}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      isAvailable
                        ? selectedTime === time
                          ? "gradient-warm text-primary-foreground"
                          : "bg-secondary hover:bg-primary/20 hover:text-primary"
                        : "bg-muted text-muted-foreground cursor-not-allowed line-through"
                    )}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Grayed out slots are not available
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Confirm Booking
            </h3>
            
            <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Business</span>
                <span className="font-semibold">{businessName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service</span>
                <span className="font-semibold">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{selectedService?.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">
                  {selectedDate && format(selectedDate, "PPP")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">{selectedService?.price}</span>
              </div>
            </div>

            <Button
              onClick={handleConfirmBooking}
              variant="hero"
              className="w-full"
              size="lg"
            >
              Confirm Appointment
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>{businessName}</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => s < step && setStep(s as 1 | 2 | 3 | 4)}
              disabled={s > step}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                s === step
                  ? "gradient-warm text-primary-foreground"
                  : s < step
                  ? "bg-primary text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {s < step ? <Check className="h-4 w-4" /> : s}
            </button>
          ))}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Back Button */}
        {step > 1 && step < 4 && (
          <Button
            variant="ghost"
            onClick={() => setStep((step - 1) as 1 | 2 | 3)}
            className="w-full mt-2"
          >
            ← Back
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;
