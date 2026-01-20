import { useState } from 'react';
import { useChat, Conversation } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { ChatList } from '@/components/chat/ChatList';
import { ChatConversation } from '@/components/chat/ChatConversation';
import { MessageCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { conversations, loading } = useChat();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const isMobile = useIsMobile();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const showList = !isMobile || !selectedConversation;
  const showConversation = !isMobile || selectedConversation;

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen flex">
        {/* Chat List */}
        {showList && (
          <div className={`${isMobile ? 'w-full' : 'w-80 lg:w-96'} shrink-0`}>
            <ChatList
              conversations={conversations}
              loading={loading}
              selectedId={selectedConversation?.id || null}
              onSelect={setSelectedConversation}
            />
          </div>
        )}

        {/* Conversation View */}
        {showConversation && (
          <div className="flex-1">
            {selectedConversation ? (
              <ChatConversation
                conversation={selectedConversation}
                onBack={() => setSelectedConversation(null)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageCircle className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-1">Your Messages</h3>
                <p className="text-sm">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
