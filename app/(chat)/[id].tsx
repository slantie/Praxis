import { useState, useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ChatHeader } from '@/components/ChatHeader';
import { MessageBubble } from '@/components/MessageBubble';
import { ChatInput } from '@/components/ChatInput';

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your offline AI assistant. I'm here to help you with any questions or tasks you have. What would you like to know?",
    isUser: false,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: '2',
    text: 'Hi! Can you help me understand how React Native navigation works?',
    isUser: true,
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: '3',
    text: `Absolutely! React Native navigation is handled through libraries like **React Navigation** or **Expo Router**. Here are the key concepts:

## Navigation Types

1. **Stack Navigation** - Pages stack on top of each other
2. **Tab Navigation** - Bottom or top tabs
3. **Drawer Navigation** - Side menu that slides out

## Basic Usage

\`\`\`javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

## Navigation Methods

- \`navigation.navigate('ScreenName')\` - Go to screen
- \`navigation.goBack()\` - Go back
- \`navigation.push('ScreenName')\` - Push new instance

Would you like me to explain any specific part in more detail?`,
    isUser: false,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
  {
    id: '4',
    text: "That's really helpful! Can you show me how to pass parameters between screens?",
    isUser: true,
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Get chat title based on ID
  const getChatTitle = (chatId: string) => {
    const titles: { [key: string]: string } = {
      '1': 'React Native Help',
      '2': 'AI Model Integration',
      '3': 'UI Design Questions',
      '4': 'Performance Optimization',
      new: 'New Chat',
    };
    return titles[chatId] || 'Chat';
  };

  // Simulate AI response
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock responses with markdown
    const responses = [
      `Great question! Here's what you need to know:

## Passing Parameters

You can pass parameters when navigating:

\`\`\`javascript
navigation.navigate('Details', {
  itemId: 86,
  otherParam: 'anything you want here',
});
\`\`\`

## Accessing Parameters

In the destination screen:

\`\`\`javascript
function DetailsScreen({ route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
}
\`\`\`

This makes it easy to pass data between screens!`,

      `That's an interesting topic! Let me break it down:

### Key Points:
- **Performance** is crucial for mobile apps
- **Navigation** should be smooth and intuitive  
- **State management** helps with data flow

Would you like me to elaborate on any of these points?`,

      `Here's a comprehensive answer:

## Best Practices

1. **Keep it simple** - Don't overcomplicate the user interface
2. **Follow platform conventions** - iOS and Android have different patterns
3. **Test on real devices** - Simulators don't always represent real performance

### Code Example:
\`\`\`typescript
const MyComponent = () => {
  const [data, setData] = useState(null);
  
  return (
    <View>
      <Text>{data?.title || 'Loading...'}</Text>
    </View>
  );
};
\`\`\`

Hope this helps!`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const aiResponse = await generateAIResponse(text);

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

  const handleNewChat = () => {
    Alert.alert('Start New Chat', 'This will start a new conversation. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Start New',
        onPress: () => {
          setMessages([
            {
              id: '1',
              text: "Hello! I'm ready to help you with a new conversation. What would you like to discuss?",
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background">
      {/* Header */}
      <ChatHeader title={getChatTitle(id || 'new')} onNewChat={handleNewChat} />

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}>
        <View className="gap-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <MessageBubble
              message={{
                id: 'loading',
                text: 'Thinking...',
                isUser: false,
                timestamp: new Date(),
                isLoading: true,
              }}
            />
          )}
        </View>
      </ScrollView>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </KeyboardAvoidingView>
  );
}
