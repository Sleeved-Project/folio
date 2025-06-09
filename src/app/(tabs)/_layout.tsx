import { Tabs } from 'expo-router';
import TabHeader from '../../components/TabHeader';
import { Focus, List, Wallet } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          headerTitle: () => <TabHeader title="Cards" displayBackButton={false} />,
          tabBarIcon: ({ focused }) => <List color={focused ? 'black' : '#A09CAB'} size={24} />,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#A09CAB',
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
                backgroundColor: '#EFF1F5',
              }}
            >
              <Focus color={focused ? 'black' : '#A09CAB'} size={40} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="folio"
        options={{
          title: 'Folio',
          headerTitle: () => <TabHeader title="Folio" displayBackButton />,
          tabBarIcon: ({ focused }) => <Wallet color={focused ? 'black' : '#A09CAB'} size={24} />,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#A09CAB',
        }}
      />
    </Tabs>
  );
}
