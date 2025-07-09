import { Stack } from 'expo-router';
import { FolioCreationProvider } from '../../features/folio/context/FolioCreationContext';

export default function FolioLayout() {
  return (
    <FolioCreationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="create-folio"
          options={{
            presentation: 'fullScreenModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="edit-folio-name"
          options={{
            presentation: 'containedTransparentModal',
            animation: 'fade',
          }}
        />
      </Stack>
    </FolioCreationProvider>
  );
}
