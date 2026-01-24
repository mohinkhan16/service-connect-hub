import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { Image, Film, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreatePostModal = ({ isOpen, onClose, onSuccess }: CreatePostModalProps) => {
  const { user } = useAuth();
  const [isReel, setIsReel] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to create a post");
      return;
    }

    if (!mediaFile) {
      toast.error("Please select an image or video");
      return;
    }

    if (!caption.trim()) {
      toast.error("Please add a caption");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll use a placeholder URL since storage isn't set up
      // In production, you would upload to Supabase Storage
      const imageUrl = mediaPreview || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop";

      const { error } = await supabase.from("posts").insert({
        business_id: user.id,
        business_name: user.user_metadata?.full_name || "My Business",
        business_avatar: user.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        category: category || "General",
        image: imageUrl,
        caption: caption,
        is_reel: isReel,
        status: "open",
      });

      if (error) throw error;

      toast.success(isReel ? "Reel created!" : "Post created!");
      handleClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCaption("");
    setCategory("");
    setMediaFile(null);
    setMediaPreview(null);
    setIsReel(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isReel ? <Film className="h-5 w-5" /> : <Image className="h-5 w-5" />}
            Create {isReel ? "Reel" : "Post"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Post Type Toggle */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                !isReel ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <Image className="h-5 w-5" />
              </div>
              <span className="font-medium">Photo Post</span>
            </div>
            <Switch
              checked={isReel}
              onCheckedChange={setIsReel}
            />
            <div className="flex items-center gap-3">
              <span className="font-medium">Video Reel</span>
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                isReel ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <Film className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <Label className="mb-2 block">
              {isReel ? "Upload Video" : "Upload Image"}
            </Label>
            {mediaPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-border">
                {isReel && mediaFile?.type.startsWith("video/") ? (
                  <video
                    src={mediaPreview}
                    className="w-full aspect-square object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-full aspect-square object-cover"
                  />
                )}
                <button
                  onClick={handleRemoveMedia}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-secondary/30">
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <span className="text-sm text-muted-foreground">
                  Click to upload {isReel ? "video" : "image"}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {isReel ? "MP4, WebM (max 50MB)" : "PNG, JPG (max 10MB)"}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={isReel ? "video/*" : "image/*"}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g. Restaurant, Salon, Clinic..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Caption */}
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption for your post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !mediaFile}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Creating..." : `Create ${isReel ? "Reel" : "Post"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
