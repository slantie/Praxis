import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Route, router } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Pressable } from 'react-native';
import { MessageSquare, Plus, Settings, User, Trash2, Menu, Clock } from 'lucide-react-native';

type ChatHistory = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'React Native Help',
    lastMessage: 'How to create components...',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    title: 'AI Model Integration',
    lastMessage: 'Setting up offline models...',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
  },
  {
    id: '3',
    title: 'UI Design Questions',
    lastMessage: 'Best practices for mobile...',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '4',
    title: 'Performance Optimization',
    lastMessage: 'How to improve app speed...',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  },
];

function CustomDrawerContent(props: any) {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    router.push(`/chat/${chatId}` as Route);
  };

  const handleDeleteChat = (chatId: string, e: any) => {
    e.stopPropagation();
    // TODO: Implement delete functionality
    console.log('Delete chat:', chatId);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView>
        <View className="border-b border-border px-4 py-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-foreground">Praxis AI</Text>
            <Button variant="ghost" size="icon" onPress={() => router.push('/(chat)/new' as Route)}>
              <Icon as={Plus} size={20} className="text-foreground" />
            </Button>
          </View>

          <Button onPress={() => router.push('/(chat)/new' as Route)} className="w-full">
            <Icon as={Plus} size={16} className="mr-2 text-primary-foreground" />
            <Text className="font-medium text-primary-foreground">New Chat</Text>
          </Button>
        </View>
      </SafeAreaView>

      {/* Chat History */}
      <ScrollView className="flex-1 px-2">
        <View className="py-2">
          <Text className="mb-2 px-3 py-2 text-sm font-medium text-muted-foreground">
            Recent Chats
          </Text>

          <View className="gap-1">
            {mockChatHistory.map((chat) => (
              <Pressable
                key={chat.id}
                onPress={() => handleChatSelect(chat.id)}
                className={`mx-1 flex-row items-center gap-3 rounded-lg p-3 ${
                  selectedChat === chat.id ? 'bg-accent' : 'bg-transparent'
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}>
                <Icon
                  as={MessageSquare}
                  size={16}
                  className={
                    selectedChat === chat.id ? 'text-accent-foreground' : 'text-muted-foreground'
                  }
                />

                <View className="min-w-0 flex-1">
                  <Text
                    className={`mb-1 text-sm font-medium ${
                      selectedChat === chat.id ? 'text-accent-foreground' : 'text-foreground'
                    }`}
                    numberOfLines={1}>
                    {chat.title}
                  </Text>
                  <Text
                    className={`text-xs ${
                      selectedChat === chat.id
                        ? 'text-accent-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                    numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                  <View className="mt-1 flex-row items-center gap-1">
                    <Icon
                      as={Clock}
                      size={10}
                      className={
                        selectedChat === chat.id
                          ? 'text-accent-foreground/50'
                          : 'text-muted-foreground/70'
                      }
                    />
                    <Text
                      className={`text-xs ${
                        selectedChat === chat.id
                          ? 'text-accent-foreground/50'
                          : 'text-muted-foreground/70'
                      }`}>
                      {formatTime(chat.timestamp)}
                    </Text>
                  </View>
                </View>

                <Button
                  variant="ghost"
                  size="icon"
                  onPress={(e) => handleDeleteChat(chat.id, e)}
                  className="h-8 w-8">
                  <Icon as={Trash2} size={12} className="text-muted-foreground" />
                </Button>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="gap-2 border-t border-border p-4">
        <Button
          variant="ghost"
          onPress={() => router.push('/profile' as Route)}
          className="justify-start">
          <Icon as={User} size={16} className="mr-3 text-foreground" />
          <Text className="text-foreground">Profile</Text>
        </Button>

        <Button
          variant="ghost"
          onPress={() => router.push('/settings' as Route)}
          className="justify-start">
          <Icon as={Settings} size={16} className="mr-3 text-foreground" />
          <Text className="text-foreground">Settings</Text>
        </Button>
      </View>
    </View>
  );
}

export default function ChatLayout() {
  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.5)',
      }}>
      <Drawer.Screen name="[id]" />
      <Drawer.Screen name="new" />
    </Drawer>
  );
}
