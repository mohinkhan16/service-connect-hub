import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  createdAt: string;
  isOwn: boolean;
  readAt: string | null;
}

export const ChatMessage = ({ content, createdAt, isOwn, readAt }: ChatMessageProps) => {
  return (
    <div className={cn('flex mb-2', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[70%] px-4 py-2 rounded-2xl relative',
          isOwn
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}
      >
        <p className="text-sm break-words">{content}</p>
        <div className={cn(
          'flex items-center gap-1 mt-1',
          isOwn ? 'justify-end' : 'justify-start'
        )}>
          <span className={cn(
            'text-[10px]',
            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}>
            {format(new Date(createdAt), 'HH:mm')}
          </span>
          {isOwn && (
            readAt ? (
              <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
            ) : (
              <Check className="h-3 w-3 text-primary-foreground/70" />
            )
          )}
        </div>
      </div>
    </div>
  );
};
