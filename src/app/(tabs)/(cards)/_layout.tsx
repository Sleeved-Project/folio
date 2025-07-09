import { Stack } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { FilterProvider } from '../../../context/FilterContext';

export default function CardsLayout() {
  const theme = useTheme();

  return (
    <FilterProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: theme.colors.background.primary,
          },
        }}
      >
        <Stack.Screen name="card-list-index" />
        <Stack.Screen
          name="filter-detail"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </FilterProvider>
  );
}
