import { Tabs } from 'expo-router';
import TabHeader from '../../components/ui/TabHeader';
import { Focus, List, Wallet } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.light,
        },
      }}
    >
      <Tabs.Screen
        name="(cards)"
        options={{
          title: 'Cards',
          headerTitle: () => <TabHeader displayBackButton={false} />,
          tabBarIcon: ({ focused }) => (
            <List
              color={focused ? theme.colors.text.primary : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerTitle: () => <TabHeader title="Scan" displayBackButton />,
          headerShown: false,
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 60,
                backgroundColor: theme.colors.background.tertiary,
              }}
            >
              <Focus
                color={focused ? theme.colors.text.primary : theme.colors.text.tertiary}
                size={40}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="folios"
        options={{
          title: 'Folios',
          headerTitle: () => <TabHeader title="Folios" />,
          tabBarIcon: ({ focused }) => (
            <Wallet
              color={focused ? theme.colors.text.primary : theme.colors.text.tertiary}
              size={24}
            />
          ),
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
        }}
      />
      <Tabs.Screen
        name="card/[cardId]"
        options={{
          href: null,
          headerTitle: () => <TabHeader displayBackButton={true} />,
        }}
      />
      <Tabs.Screen
        name="(sets)"
        options={{
          href: null,
          headerTitle: () => <TabHeader displayBackButton={true} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerTitle: () => <TabHeader displayBackButton={true} />,
        }}
      />
    </Tabs>
  );
}
