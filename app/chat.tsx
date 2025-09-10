import { useState, useRef } from 'react';
import { View, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { SendIcon, Trash2 } from 'lucide-react-native';
import { Input } from '@/components/ui/input';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your offline AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Simulate AI response (replace with your actual AI logic)
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // This is where you'll integrate your offline AI model
    // For now, using a simple simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand your point. Here's what I think...",
      "Based on what you've said, I'd suggest...",
      "That's a great topic to explore. Consider this perspective...",
      "I can help with that! Here's my recommendation...",
    ];

    return (
      responses[Math.floor(Math.random() * responses.length)] +
      ` (Responding to: "${userMessage.slice(0, 30)}...")`
    );
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const aiResponse = await generateAIResponse(userMessage.text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate response');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const clearChat = () => {
    Alert.alert('Clear Chat', 'Are you sure you want to clear all messages?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () =>
          setMessages([
            {
              id: '1',
              text: 'Chat cleared! How can I help you?',
              isUser: false,
              timestamp: new Date(),
            },
          ]),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background">
      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}>
            <View
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser ? 'bg-primary' : 'border border-border bg-card'
              }`}>
              <Text
                className={`${
                  message.isUser ? 'text-primary-foreground' : 'text-card-foreground'
                }`}>
                {message.text}
              </Text>
              <Text
                className={`mt-1 text-xs ${
                  message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        ))}

        {isLoading && (
          <View className="mb-4 items-start">
            <View className="rounded-lg border border-border bg-card p-3">
              <Text className="text-card-foreground">Thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="border-t border-border bg-background p-4 pb-12">
        <View className="flex-row items-center gap-3">
          <Input
            className="flex-1 text-base text-card-foreground"
            placeholder="Type your message..."
            placeholderTextColor="#6b7280"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={10000}
            editable={!isLoading}
          />
          <Button onPress={sendMessage} disabled={!inputText.trim() || isLoading} size="icon">
            <Icon as={SendIcon} size={16} className="text-primary-foreground" />
          </Button>
          <Button variant="outline" onPress={clearChat} size="icon">
            <Icon as={Trash2} size={16} className="text-foreground" />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
