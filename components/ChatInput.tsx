import { useState, useRef } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Send, Mic, Paperclip, Smile } from 'lucide-react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
  maxLength = 2000,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      Alert.alert('Empty Message', 'Please enter a message to send.');
      return;
    }

    if (trimmedMessage.length > maxLength) {
      Alert.alert('Message Too Long', `Message must be under ${maxLength} characters.`);
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage('');
    inputRef.current?.blur();
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // TODO: Implement voice recording functionality
      Alert.alert('Voice Input', 'Voice recording stopped. (Feature coming soon)');
    } else {
      // Start recording
      setIsRecording(true);
      // TODO: Implement voice recording functionality
      Alert.alert('Voice Input', 'Voice recording started. (Feature coming soon)');
    }
  };

  const handleAttachment = () => {
    Alert.alert('Attachments', 'Choose attachment type:', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera', onPress: () => console.log('Camera selected') },
      { text: 'Gallery', onPress: () => console.log('Gallery selected') },
      { text: 'Document', onPress: () => console.log('Document selected') },
    ]);
  };

  const handleEmojiPicker = () => {
    // TODO: Implement emoji picker
    Alert.alert('Emoji Picker', 'Emoji picker coming soon!');
  };

  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const canSend = message.trim().length > 0 && !disabled && characterCount <= maxLength;

  return (
    <View className="border-t border-border bg-background px-4 py-3">
      {/* Character count warning */}
      {isNearLimit && (
        <View className="mb-2">
          <Text
            className={`text-right text-xs ${
              characterCount > maxLength ? 'text-destructive' : 'text-muted-foreground'
            }`}>
            {characterCount}/{maxLength}
          </Text>
        </View>
      )}

      {/* Input row */}
      <View className="flex-row items-end gap-3">
        {/* Attachment button */}
        <Button
          variant="ghost"
          size="icon"
          onPress={handleAttachment}
          disabled={disabled}
          accessibilityLabel="Add attachment">
          <Icon as={Paperclip} size={20} className="text-foreground" />
        </Button>

        {/* Input container */}
        <View className="min-h-[44px] flex-1 justify-center rounded-2xl border border-border bg-card px-4 py-2">
          <TextInput
            ref={inputRef}
            className="max-h-32 flex-1 text-base text-card-foreground"
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="center"
            editable={!disabled}
            maxLength={maxLength}
            returnKeyType="default"
            blurOnSubmit={false}
            style={{
              minHeight: 20,
              paddingVertical: 0,
            }}
          />
        </View>

        {/* Right side buttons */}
        <View className="flex-row items-center gap-2">
          {/* Emoji button */}
          <Button
            variant="ghost"
            size="icon"
            onPress={handleEmojiPicker}
            disabled={disabled}
            accessibilityLabel="Add emoji">
            <Icon as={Smile} size={20} className="text-foreground" />
          </Button>

          {/* Voice/Send button */}
          {message.trim().length === 0 ? (
            <Button
              variant={isRecording ? 'destructive' : 'ghost'}
              size="icon"
              onPress={handleVoiceInput}
              disabled={disabled}
              accessibilityLabel={isRecording ? 'Stop recording' : 'Start voice recording'}>
              <Icon
                as={Mic}
                size={20}
                className={isRecording ? 'text-destructive-foreground' : 'text-foreground'}
              />
            </Button>
          ) : (
            <Button
              onPress={handleSend}
              disabled={!canSend}
              size="icon"
              accessibilityLabel="Send message">
              <Icon as={Send} size={20} className="text-primary-foreground" />
            </Button>
          )}
        </View>
      </View>

      {/* Recording indicator */}
      {isRecording && (
        <View className="mt-2 flex-row items-center justify-center gap-2 rounded-lg bg-destructive/10 p-2">
          <View className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          <Text className="text-sm font-medium text-destructive">Recording...</Text>
        </View>
      )}
    </View>
  );
}
