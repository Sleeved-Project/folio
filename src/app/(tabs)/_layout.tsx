import { Tabs } from 'expo-router';
import TabHeader from '../../components/TabHeader';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          headerTitle: () => <TabHeader title="Cards" displayBackButton={false} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerTitle: () => <TabHeader title="Scan" displayBackButton />,
        }}
      />
      <Tabs.Screen
        name="folio"
        options={{
          title: 'Folio',
          headerTitle: () => <TabHeader title="Folio" displayBackButton />,
        }}
      />
    </Tabs>
  );
}
