import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Textarea, Button } from '.';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChangeText, onSend }: ChatInputProps) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Textarea
        value={value}
        onChangeText={onChangeText}
        placeholder="Type a message..."
        placeholderTextColor={theme.mutedForeground}
        style={[
          styles.textarea,
          { backgroundColor: theme.input, color: theme.foreground, borderColor: theme.border },
        ]}
      />
      <Button onPress={onSend} style={[styles.button, { backgroundColor: theme.primary }]}>
        Send
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  textarea: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
