import { Tabs } from 'expo-router';
import TabHeader from '../../components/ui/TabHeader';
import { Focus, List, Wallet } from 'lucide-react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useRouter } from 'expo-router';

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
        name="index"
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
          tabBarButton: () => {
            const router = useRouter();
            const theme = useTheme();
            return (
              <TouchableOpacity
                onPress={() => router.push('/(scan)/scan')}
                style={[styles.scanButtonContainer]}
                activeOpacity={0.85}
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
                  <Focus color={theme.colors.primary} size={32} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="folios"
        options={{
          title: 'My collection',
          headerTitle: () => <TabHeader title="My collection" />,
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
        name="set/[setId]"
        options={{
          href: null,
          headerTitle: () => <TabHeader displayBackButton={true} />,
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
