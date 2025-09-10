import { View, SafeAreaView } from 'react-native';
import { Route, router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Menu, Plus, MoreVertical, Share, Trash2, Edit3 } from 'lucide-react-native';

interface ChatHeaderProps {
  title: string;
  onNewChat?: () => void;
  onShareChat?: () => void;
  onDeleteChat?: () => void;
  onEditTitle?: () => void;
}

export function ChatHeader({
  title,
  onNewChat,
  onShareChat,
  onDeleteChat,
  onEditTitle,
}: ChatHeaderProps) {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      router.push('/(chat)/new' as Route);
    }
  };

  const handleMoreOptions = () => {
    // TODO: Implement action sheet or dropdown
    console.log('More options pressed');
  };

  return (
    <SafeAreaView className="border-b border-border bg-background">
      <View className="flex-row items-center justify-between px-4 py-3">
        {/* Left side - Menu button */}
        <Button
          variant="ghost"
          size="icon"
          onPress={openDrawer}
          accessibilityLabel="Open menu"
          accessibilityHint="Opens the navigation drawer with chat history">
          <Icon as={Menu} size={20} className="text-foreground" />
        </Button>

        {/* Center - Chat title */}
        <View className="mx-4 flex-1">
          <Text className="text-center text-lg font-semibold text-foreground" numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right side - Action buttons */}
        <View className="flex-row items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onPress={handleNewChat}
            accessibilityLabel="New chat"
            accessibilityHint="Start a new conversation">
            <Icon as={Plus} size={20} className="text-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onPress={handleMoreOptions}
            accessibilityLabel="More options"
            accessibilityHint="Open additional options menu">
            <Icon as={MoreVertical} size={20} className="text-foreground" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
