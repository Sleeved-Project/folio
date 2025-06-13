import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCardDetail } from '../hooks/queries/useCardDetail';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';
import CardMetaInfo from '../components/CardMetaInfo';
import CardDetailedInfo from '../components/CardDetailedInfo';
import CardPricesInfo from '../components/CardPricesInfo';
import CardImageSection from '../components/CardImageSection';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';
import AnimatedDrawer from '../components/AnimatedDrawer';
import { useDrawerAnimation } from '../hooks/useDrawerAnimation';
import { ScrollView } from 'react-native-gesture-handler';

type TabType = 'details' | 'prices';

export default function CardDetail({ cardId }: { cardId?: string }) {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const { toggleDrawer, gestureHandler, drawerAnimatedStyle, cardImageAnimatedStyle } =
    useDrawerAnimation();

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
      <CardImageSection
        imageUrl={basicCardData.imageLarge}
        cardAnimatedStyle={cardImageAnimatedStyle}
        onCardPress={toggleDrawer}
      />

      <AnimatedDrawer
        gestureHandler={gestureHandler}
        animatedStyle={drawerAnimatedStyle}
        onDragHandlePress={toggleDrawer}
        headerComponent={<CardMetaInfo number={basicCardData.number} set={basicCardData.set} />}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.detailContent}>
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
        </ScrollView>
      </AnimatedDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  detailContent: {
    paddingVertical: 16,
  },
});
