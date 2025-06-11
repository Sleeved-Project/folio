import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCardDetail } from '../hooks/queries/useCardDetail';
import DetailCard from '../../../components/ui/DetailCard';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';
import CardMetaInfo from '../components/CardMetaInfo';
import CardDetailedInfo from '../components/CardDetailedInfo';
import CardPricesInfo from '../components/CardPricesInfo';
import CardImageSection from '../components/CardImageSection';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';

type TabType = 'details' | 'prices';

export default function CardDetail({ cardId }: { cardId?: string }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const {
    data: basicCardData,
    isLoading: isLoadingBasic,
    error: basicError,
  } = useCardDetail(cardId as string);

  const tabOptions: TabOption<TabType>[] = [
    { id: 'details', label: 'Details' },
    { id: 'prices', label: 'Prices' },
  ];

  if (isLoadingBasic) {
    return <LoadingState />;
  }

  if (basicError || !basicCardData) {
    return (
      <ErrorState
        message={basicError instanceof Error ? basicError.message : 'Failed to load card'}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CardImageSection imageUrl={basicCardData.imageLarge} />

      <DetailCard
        style={[styles.detailCardStyle, { bottom: -insets.bottom }]}
        headerComponent={<CardMetaInfo number={basicCardData.number} set={basicCardData.set} />}
      >
        <TabSwitcher
          options={tabOptions}
          activeTabId={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
          containerStyle={{ marginTop: 8 }}
        />

        {activeTab === 'details' ? (
          <CardDetailedInfo cardId={cardId} />
        ) : (
          <CardPricesInfo cardId={cardId} />
        )}
      </DetailCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  detailCardStyle: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
