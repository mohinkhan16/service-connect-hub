import { Conversation } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface ChatListProps {
  conversations: Conversation[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (conversation: Conversation) => void;
}

export const ChatList = ({ conversations, loading, selectedId, onSelect }: ChatListProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.other_user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted border-none rounded-full"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground p-4">
            <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-center">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const otherUser = conv.other_user;
            const initials = otherUser?.full_name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase() || '?';
            const isUnread = conv.last_message && 
              conv.last_message.sender_id !== user?.id && 
              !conv.last_message.read_at;

            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv)}
                className={cn(
                  'flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/50',
                  selectedId === conv.id && 'bg-muted',
                  isUnread && 'bg-primary/5'
                )}
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={otherUser?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={cn(
                      'font-medium truncate',
                      isUnread && 'font-semibold'
                    )}>
                      {otherUser?.full_name || 'Unknown User'}
                    </h3>
                    {conv.last_message && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(conv.last_message.created_at), { addSuffix: false })}
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-sm truncate',
                    isUnread ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {conv.last_message?.content || 'Start chatting...'}
                  </p>
                </div>
                {isUnread && (
                  <div className="h-3 w-3 rounded-full bg-primary shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
