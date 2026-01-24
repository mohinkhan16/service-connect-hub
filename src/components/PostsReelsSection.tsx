import PostCard from "./PostCard";
import { Button } from "@/components/ui/button";
import { Film, Grid3X3, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "@/contexts/AuthContext";

import { ShopStatusType } from "./ShopStatus";

const posts: Array<{
  id: string;
  businessName: string;
  businessAvatar: string;
  category: string;
  image: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  isReel: boolean;
  status: ShopStatusType;
}> = [
  {
    id: "1",
    businessName: "Serenity Wellness Spa",
    businessAvatar: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=faces",
    category: "Hair Salon & Spa",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop",
    caption: "Pamper yourself this weekend with our signature relaxation massage. Book now and get 20% off! 💆‍♀️✨",
    likes: 234,
    comments: 18,
    isReel: false,
    status: "open",
  },
  {
    id: "2",
    businessName: "Bella Italia Ristorante",
    businessAvatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=faces",
    category: "Italian Cuisine",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Fresh out of the oven! Our wood-fired Margherita pizza with imported Italian ingredients 🍕🇮🇹",
    likes: 567,
    comments: 42,
    isReel: true,
    status: "closed",
  },
  {
    id: "3",
    businessName: "Zen Yoga Studio",
    businessAvatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop&crop=faces",
    category: "Yoga & Meditation",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    caption: "Morning flow session with our expert instructors. Join our sunrise yoga class! 🧘‍♀️🌅",
    likes: 189,
    comments: 23,
    isReel: true,
    status: "open",
  },
  {
    id: "4",
    businessName: "Dr. Smith's Family Clinic",
    businessAvatar: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=100&h=100&fit=crop&crop=faces",
    category: "Clinic",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=600&fit=crop",
    caption: "New state-of-the-art equipment for better diagnostics. Your health is our priority! 🏥💙",
    likes: 98,
    comments: 12,
    isReel: false,
    status: "busy",
  },
  {
    id: "5",
    businessName: "Quick Fix Repairs",
    businessAvatar: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&h=100&fit=crop",
    category: "Repair & Service",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop",
    caption: "iPhone screen repair done in just 30 minutes! Same-day service available 📱🔧",
    likes: 145,
    comments: 31,
    isReel: false,
    status: "open",
  },
  {
    id: "6",
    businessName: "Homemade Delights",
    businessAvatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=faces",
    category: "Home Business",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Custom cakes for all occasions! Order your birthday cake today 🎂✨ Free delivery within 5km",
    likes: 312,
    comments: 56,
    isReel: true,
    status: "busy",
  },
];

const PostsReelsSection = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "posts" | "reels">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "reels") return post.isReel;
    return !post.isReel;
  });

  return (
    <section id="posts-reels" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="gradient-warm-text">Posts & Reels</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover what local businesses are sharing. Browse posts, watch reels, 
              and send quick enquiries directly.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Create Post Button */}
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="gradient-warm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  filter === "all" 
                    ? "gradient-warm text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilter("posts")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  filter === "posts" 
                    ? "gradient-warm text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
                Posts
              </button>
              <button
                onClick={() => setFilter("reels")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  filter === "reels" 
                    ? "gradient-warm text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Film className="h-4 w-4" />
                Reels
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              {...post}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="hero-outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </section>
  );
};

export default PostsReelsSection;
