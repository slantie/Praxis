import { View, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { useColorScheme } from 'nativewind';
import {
  BrainIcon,
  MessageCircleIcon,
  MoonIcon,
  PlusIcon,
  ShieldIcon,
  SunIcon,
  ZapIcon,
} from 'lucide-react-native';

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const startNewChat = () => {
    router.push('/chat');
  };

  const goToTestPage = () => {
    router.push('/test');
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6 py-12">
        {/* Logo/Header */}
        <View className="mb-12 items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-primary">
            <Icon as={MessageCircleIcon} size={48} className="text-primary-foreground" />
          </View>
          <Text className="mb-2 text-4xl font-bold text-foreground">Praxis AI</Text>
          <Text className="text-center text-lg text-muted-foreground">
            Your offline AI assistant
          </Text>
        </View>

        {/* Features */}
        <View className="mb-12 w-full max-w-sm">
          <View className="mb-4 rounded-lg border border-border bg-card p-6">
            <View className="mb-3 flex-row items-center">
              <Icon as={ZapIcon} size={24} className="mr-3 text-primary" />
              <Text className="text-lg font-semibold text-card-foreground">Lightning Fast</Text>
            </View>
            <Text className="text-muted-foreground">
              Runs completely offline with no internet required
            </Text>
          </View>

          <View className="mb-4 rounded-lg border border-border bg-card p-6">
            <View className="mb-3 flex-row items-center">
              <Icon as={ShieldIcon} size={24} className="mr-3 text-primary" />
              <Text className="text-lg font-semibold text-card-foreground">Privacy First</Text>
            </View>
            <Text className="text-muted-foreground">
              Your conversations never leave your device
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full max-w-sm gap-5">
          <Button onPress={startNewChat} size="lg" className="rounded-full">
            <Icon as={PlusIcon} size={20} className="mr-2 text-primary-foreground" />
            <Text className="font-semibold text-primary-foreground">Start New Chat</Text>
          </Button>

          <Button onPress={goToTestPage} size="lg" className="w-full">
            <Icon as={PlusIcon} size={20} className="mr-2 text-primary-foreground" />
            <Text className="font-semibold text-primary-foreground">Go to Test Page</Text>
          </Button>

          <Button variant="outline" onPress={toggleColorScheme} size="lg" className="w-full">
            <Icon
              as={colorScheme === 'dark' ? SunIcon : MoonIcon}
              size={20}
              className="mr-2 text-foreground"
            />
            <Text className="text-foreground">
              {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
