import { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user_id: string | null;
  user_name: string;
  user_avatar: string | null;
  content: string;
  created_at: string;
}

interface CommentsSectionProps {
  postId: string;
  compact?: boolean;
}

// Mock comments for demo (since we're using static post IDs)
const mockComments: Comment[] = [
  {
    id: "mock-1",
    user_id: null,
    user_name: "Priya Sharma",
    user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    content: "Bahut sundar! 😍 Price kya hai?",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "mock-2",
    user_id: null,
    user_name: "Rahul Verma",
    user_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    content: "Great service! Highly recommended 👍",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "mock-3",
    user_id: null,
    user_name: "Anjali Patel",
    user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    content: "Delivery available hai kya?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

const CommentsSection = ({ postId, compact = false }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Fetch real comments from database
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setComments([...data, ...mockComments]);
      }
    };

    fetchComments();

    // Subscribe to realtime comments
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "post_comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // For demo, add locally since post IDs are static
    const newCommentObj: Comment = {
      id: `local-${Date.now()}`,
      user_id: user.id,
      user_name: profile?.full_name || user.email?.split("@")[0] || "User",
      user_avatar: profile?.avatar_url || null,
      content: newComment.trim(),
      created_at: new Date().toISOString(),
    };

    setComments((prev) => [newCommentObj, ...prev]);
    setNewComment("");
    setIsSubmitting(false);

    toast({
      title: "Comment added!",
      description: "Your comment has been posted",
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    toast({
      title: "Comment deleted",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Comment Input */}
        <div className="flex items-center gap-2">
          <Input
            placeholder={user ? "Add a comment..." : "Login to comment"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!user}
            className="flex-1 text-sm"
          />
          <Button
            size="icon"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Recent Comments */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {comments.slice(0, 3).map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <img
                src={comment.user_avatar || `https://ui-avatars.com/api/?name=${comment.user_name}&background=random`}
                alt={comment.user_name}
                className="w-6 h-6 rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{comment.user_name}</span>{" "}
                  <span className="text-muted-foreground">{comment.content}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {comments.length > 3 && (
          <p className="text-xs text-muted-foreground">
            +{comments.length - 3} more comments
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Comments List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 group">
              <img
                src={comment.user_avatar || `https://ui-avatars.com/api/?name=${comment.user_name}&background=random`}
                alt={comment.user_name}
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{comment.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
              </div>
              {user?.id === comment.user_id && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              )}
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment!</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Comment Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder={user ? "Add a comment..." : "Login to comment"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!user}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
