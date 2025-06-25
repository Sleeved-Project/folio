import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import { TabSwitcher } from '../../components/ui/TabSwitcher';
import MyCardsScreen from '../../features/folio/screens/MyCardsScreen';
import MyFoliosScreen from '../../features/folio/screens/MyFoliosScreen';

type FolioTabType = 'cards' | 'folios';

export default function Folio() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<FolioTabType>('cards');

  const tabOptions = [
    { id: 'cards' as const, label: 'My Cards' },
    { id: 'folios' as const, label: 'My Folios' },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <TabSwitcher
          options={tabOptions}
          activeTabId={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
          containerStyle={styles.tabSwitcher}
        />
        {activeTab === 'cards' ? <MyCardsScreen /> : <MyFoliosScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabSwitcher: {
    marginBottom: 0,
  },
});
