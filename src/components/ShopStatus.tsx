import { cn } from "@/lib/utils";

export type ShopStatusType = "open" | "busy" | "closed";

interface ShopStatusProps {
  status: ShopStatusType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const statusConfig = {
  open: {
    color: "bg-green-500",
    pulseColor: "bg-green-400",
    label: "Open",
    description: "Ready to serve",
  },
  busy: {
    color: "bg-yellow-500",
    pulseColor: "bg-yellow-400",
    label: "Busy",
    description: "High waiting time",
  },
  closed: {
    color: "bg-red-500",
    pulseColor: "bg-red-400",
    label: "Closed",
    description: "Currently unavailable",
  },
};

const sizeConfig = {
  sm: {
    dot: "w-2.5 h-2.5",
    pulse: "w-2.5 h-2.5",
    text: "text-xs",
  },
  md: {
    dot: "w-3 h-3",
    pulse: "w-3 h-3",
    text: "text-sm",
  },
  lg: {
    dot: "w-4 h-4",
    pulse: "w-4 h-4",
    text: "text-base",
  },
};

const ShopStatus = ({ status, size = "md", showLabel = true }: ShopStatusProps) => {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        {/* Pulse animation for open/busy status */}
        {status !== "closed" && (
          <span
            className={cn(
              "absolute rounded-full animate-ping opacity-75",
              config.pulseColor,
              sizes.pulse
            )}
          />
        )}
        <span
          className={cn(
            "relative rounded-full",
            config.color,
            sizes.dot
          )}
        />
      </div>
      {showLabel && (
        <span className={cn("font-medium", sizes.text)}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export default ShopStatus;
