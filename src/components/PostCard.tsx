import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play } from "lucide-react";
import { useState } from "react";
import EnquiryButtons from "./EnquiryButtons";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  businessName: string;
  businessAvatar: string;
  category: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isReel?: boolean;
  delay?: number;
}

const PostCard = ({
  businessName,
  businessAvatar,
  category,
  image,
  caption,
  likes,
  comments,
  isReel = false,
  delay = 0,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <div 
      className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-soft animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={businessAvatar}
            alt={businessName}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <h4 className="font-semibold text-sm">{businessName}</h4>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Image/Video */}
      <div className="relative aspect-square bg-muted">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover"
        />
        {isReel && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-8 w-8 text-foreground fill-foreground ml-1" />
            </div>
          </div>
        )}
        {isReel && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded-md text-xs text-white font-medium">
            Reel
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="group"
            >
              <Heart className={cn(
                "h-6 w-6 transition-all group-hover:scale-110",
                isLiked ? "fill-red-500 text-red-500" : "text-foreground"
              )} />
            </button>
            <button 
              onClick={() => setShowEnquiry(!showEnquiry)}
              className="group"
            >
              <MessageCircle className="h-6 w-6 text-foreground transition-all group-hover:scale-110" />
            </button>
            <button className="group">
              <Share2 className="h-6 w-6 text-foreground transition-all group-hover:scale-110" />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="group"
          >
            <Bookmark className={cn(
              "h-6 w-6 transition-all group-hover:scale-110",
              isSaved ? "fill-foreground" : ""
            )} />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {(likes + (isLiked ? 1 : 0)).toLocaleString()} likes
        </p>

        {/* Caption */}
        <p className="text-sm mb-3">
          <span className="font-semibold">{businessName}</span>{" "}
          <span className="text-muted-foreground">{caption}</span>
        </p>

        {/* Comments */}
        <button className="text-sm text-muted-foreground mb-4">
          View all {comments} comments
        </button>

        {/* Enquiry Buttons */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          showEnquiry ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="pt-3 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick Enquiry</p>
            <EnquiryButtons businessName={businessName} compact />
          </div>
        </div>

        {/* Toggle Enquiry */}
        <button
          onClick={() => setShowEnquiry(!showEnquiry)}
          className="w-full mt-2 py-2 text-sm font-medium text-primary hover:underline"
        >
          {showEnquiry ? "Hide enquiry options" : "💬 Quick Enquiry"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
