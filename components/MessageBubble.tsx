import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Copy, User, Bot, Clock } from 'lucide-react-native';
import { Message } from '../app/(chat)/[id]';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdownText = (text: string) => {
    // Simple markdown rendering for MVP
    const parts = text.split(
      /(\*\*.*?\*\*|`.*?`|```[\s\S]*?```|#{1,3}\s.*?$|^\d+\.\s.*?$|^[-*]\s.*?$)/gm
    );

    return parts.map((part, index) => {
      // Headers
      if (part.match(/^#{1,3}\s/)) {
        const level = part.match(/^#{1,3}/)?.[0].length || 1;
        const textContent = part.replace(/^#{1,3}\s/, '');
        const headerClass =
          level === 1
            ? 'text-xl font-bold'
            : level === 2
              ? 'text-lg font-semibold'
              : 'text-base font-medium';
        return (
          <Text key={index} className={`${headerClass} mb-2 text-card-foreground`}>
            {textContent}
          </Text>
        );
      }

      // Bold text
      if (part.match(/\*\*.*?\*\*/)) {
        const boldText = part.replace(/\*\*/g, '');
        return (
          <Text key={index} className="font-semibold text-card-foreground">
            {boldText}
          </Text>
        );
      }

      // Code blocks
      if (part.match(/```[\s\S]*?```/)) {
        const codeContent = part.replace(/```\w*\n?|\n?```/g, '');
        return (
          <View key={index} className="my-2 rounded-md bg-muted p-3">
            <Text className="font-mono text-sm text-muted-foreground">{codeContent}</Text>
          </View>
        );
      }

      // Inline code
      if (part.match(/`.*?`/)) {
        const codeContent = part.replace(/`/g, '');
        return (
          <Text
            key={index}
            className="rounded bg-muted px-1 py-0.5 font-mono text-sm text-muted-foreground">
            {codeContent}
          </Text>
        );
      }

      // List items
      if (part.match(/^[-*]\s/)) {
        const listContent = part.replace(/^[-*]\s/, '');
        return (
          <View key={index} className="mb-1 flex-row">
            <Text className="mr-2 text-card-foreground">•</Text>
            <Text className="flex-1 text-card-foreground">{listContent}</Text>
          </View>
        );
      }

      // Numbered lists
      if (part.match(/^\d+\.\s/)) {
        return (
          <Text key={index} className="mb-1 text-card-foreground">
            {part}
          </Text>
        );
      }

      // Regular text
      if (part.trim()) {
        return (
          <Text key={index} className="leading-6 text-card-foreground">
            {part}
          </Text>
        );
      }

      return null;
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View className={`flex-row gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <View
        className={`h-8 w-8 items-center justify-center rounded-full ${
          message.isUser ? 'bg-primary' : 'bg-secondary'
        }`}>
        <Icon
          as={message.isUser ? User : Bot}
          size={16}
          className={message.isUser ? 'text-primary-foreground' : 'text-secondary-foreground'}
        />
      </View>

      {/* Message Content */}
      <View className={`max-w-[85%] flex-1 ${message.isUser ? 'items-end' : 'items-start'}`}>
        <Pressable
          onLongPress={handleCopy}
          className={`rounded-2xl p-4 ${
            message.isUser
              ? 'rounded-br-md bg-primary'
              : 'rounded-bl-md border border-border bg-card'
          } ${message.isLoading ? 'opacity-70' : ''}`}>
          {/* Message Text */}
          <View className="gap-1">
            {message.isUser ? (
              <Text className="leading-6 text-primary-foreground">{message.text}</Text>
            ) : (
              <View>{renderMarkdownText(message.text)}</View>
            )}
          </View>

          {/* Loading indicator */}
          {message.isLoading && (
            <View className="mt-2 flex-row items-center gap-1">
              <View className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50" />
              <View className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50 delay-100" />
              <View className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50 delay-200" />
            </View>
          )}
        </Pressable>

        {/* Message Info */}
        <View
          className={`mt-1 flex-row items-center gap-2 px-1 ${
            message.isUser ? 'flex-row-reverse' : 'flex-row'
          }`}>
          <View className="flex-row items-center gap-1">
            <Icon as={Clock} size={10} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</Text>
          </View>

          {!message.isLoading && (
            <Button variant="ghost" size="icon" onPress={handleCopy} className="h-6 w-6">
              <Icon
                as={Copy}
                size={10}
                className={copied ? 'text-green-500' : 'text-muted-foreground'}
              />
            </Button>
          )}
        </View>

        {copied && <Text className="mt-1 px-1 text-xs text-green-500">Copied to clipboard!</Text>}
      </View>
    </View>
  );
}
