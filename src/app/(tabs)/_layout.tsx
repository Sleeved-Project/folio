import { Tabs } from 'expo-router';
import TabHeader from '../../components/ui/TabHeader';
import { FocusIcon, LayoutGridIcon, WalletIcon, StoreIcon, UserIcon } from 'lucide-react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <StoreIcon
              color={focused ? theme.colors.primaryForeground : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.primaryForeground,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ focused }) => (
            <LayoutGridIcon
              color={focused ? theme.colors.primaryForeground : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.primaryForeground,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: () => {
            const router = useRouter();
            const theme = useTheme();
            return (
              <TouchableOpacity
                onPress={() => router.push('/(scan)/scan')}
                style={styles.scanButtonContainer}
                activeOpacity={0.85}
                accessible
                accessibilityRole="button"
                accessibilityLabel="Scan a card"
                accessibilityHint="Opens the card scanner to scan a new card"
              >
                <View
                  style={[
                    styles.scanButton,
                    {
                      backgroundColor: theme.colors.variants.primaryLight,
                      borderColor: theme.colors.primary,
                    },
                  ]}
                >
                  <FocusIcon color={theme.colors.primaryForeground} size={32} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="folios"
        options={{
          title: 'Collection',
          tabBarIcon: ({ focused }) => (
            <WalletIcon
              color={focused ? theme.colors.primaryForeground : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.primaryForeground,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <UserIcon
              color={focused ? theme.colors.primaryForeground : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.primaryForeground,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="card/[cardId]"
        options={{
          href: null,
          headerTitle: () => <TabHeader title="Card details" displayBackButton={true} />,
        }}
      />
      <Tabs.Screen
        name="set/[setId]"
        options={{
          href: null,
          headerTitle: () => <TabHeader title="Set details" displayBackButton={true} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 999,
  },
  scanButton: {
    width: 64,
    height: 64,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
