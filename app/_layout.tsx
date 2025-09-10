import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import '../global.css';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Praxis AI',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="chat"
          options={{
            title: 'Chat',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="test"
          options={{
            title: 'Test',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
