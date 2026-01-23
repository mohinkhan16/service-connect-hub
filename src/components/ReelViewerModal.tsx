import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CommentsSection from "./CommentsSection";

interface ReelViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    businessName: string;
    businessAvatar: string;
    category: string;
    image: string;
    caption: string;
    likes: number;
    comments: number;
  };
}

const ReelViewerModal = ({ isOpen, onClose, post }: ReelViewerModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        hideCloseButton 
        className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black border-none overflow-hidden"
      >
        <div className="relative w-full h-full flex">
          {/* Video/Image Container */}
          <div className="relative flex-1 flex items-center justify-center bg-black">
            {/* Close Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Video/Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={post.image}
                alt={post.caption}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Play/Pause Overlay */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  {isPlaying ? (
                    <Pause className="h-10 w-10 text-black" />
                  ) : (
                    <Play className="h-10 w-10 text-black ml-1" />
                  )}
                </div>
              </button>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/30 rounded-full mb-4">
                  <div className="w-1/3 h-full bg-white rounded-full" />
                </div>

                {/* Business Info */}
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={post.businessAvatar}
                    alt={post.businessName}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{post.businessName}</h4>
                    <p className="text-sm text-white/70">{post.category}</p>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-white text-sm line-clamp-2">{post.caption}</p>
              </div>

              {/* Volume Control */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-20 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-white" />
                ) : (
                  <Volume2 className="h-5 w-5 text-white" />
                )}
              </button>
            </div>

            {/* Side Actions */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                  <Heart className={cn(
                    "h-7 w-7 transition-all",
                    isLiked ? "fill-red-500 text-red-500" : "text-white"
                  )} />
                </div>
                <span className="text-white text-xs font-medium">
                  {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
                </span>
              </button>

              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex flex-col items-center gap-1"
              >
                <div className={cn(
                  "p-3 rounded-full transition-colors",
                  showComments ? "bg-primary" : "bg-black/50 hover:bg-black/70"
                )}>
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{post.comments}</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <div className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-white text-xs font-medium">Share</span>
              </button>

              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                  <Bookmark className={cn(
                    "h-7 w-7 transition-all",
                    isSaved ? "fill-white text-white" : "text-white"
                  )} />
                </div>
                <span className="text-white text-xs font-medium">Save</span>
              </button>
            </div>
          </div>

          {/* Comments Panel */}
          {showComments && (
            <div className="w-80 md:w-96 bg-card border-l border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Comments</h3>
              </div>
              <CommentsSection postId={post.id} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReelViewerModal;
