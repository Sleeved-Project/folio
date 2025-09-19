import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';
import { useTheme } from '../../../theme/useTheme';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';

import CardImageSection from '../components/CardImageSection';
import AnimatedDrawer from '../components/AnimatedDrawer';
import AddCardButton from '../components/AddCardButton';
import CardMetaInfo from '../components/CardMetaInfo';
import CardDetailedInfo from '../components/CardDetailedInfo';
import CardPricesInfo from '../components/CardPricesInfo';
import CardAvailableOffers from '../components/CardAvailableOffers';

import { useCardDetail } from '../hooks/queries/useCardsQuery';
import { useDrawerAnimation } from '../hooks/useDrawerAnimation';
import { useCardFolioDelete } from '../../folio/hooks/mutations/useCardFolioDelete';
import { useCardFolioCollect } from '../../folio/hooks/mutations/useCardFolioCollect';
import { useCardFolioUpdate } from '../../folio/hooks/mutations/useCardFolioUpdate';

type TabType = 'details' | 'prices';

export default function CardDetail({ cardId }: { cardId: string }) {
  const [activeTab, setActiveTab] = useState<TabType>('prices');
  const [previousCardQuantity, setPreviousCardQuantity] = useState<number>(0);

  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const { mutate: deleteCardFolio } = useCardFolioDelete();
  const { mutate: collectCard } = useCardFolioCollect();
  const { mutate: updateCardFolio } = useCardFolioUpdate();

  const {
    data: basicCardData,
    isLoading: isLoadingBasic,
    error: basicError,
    refetch: refetchCardDetail,
  } = useCardDetail(cardId);

  const { toggleDrawer, gestureHandler, drawerAnimatedStyle, cardImageAnimatedStyle } =
    useDrawerAnimation();

  useEffect(() => {
    setPreviousCardQuantity(basicCardData?.occurrence ?? 0);
  }, [cardId, basicCardData?.occurrence]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [cardId]);

  useRefetchOnFocus(refetchCardDetail);

  const tabOptions: TabOption<TabType>[] = [
    { id: 'prices', label: 'Prices' },
    { id: 'details', label: 'Details' },
  ];

  const handleCollectionChange = useCallback(
    (cardId: string, quantity?: number) => {
      if (quantity === undefined) return;

      if (quantity === 0) deleteCardFolio({ cardId });
      else if (quantity === 1 && previousCardQuantity === 0) collectCard({ cardId });
      else if (quantity >= 1) updateCardFolio({ cardId, occurrence: quantity });

      setPreviousCardQuantity(quantity);
    },
    [deleteCardFolio, collectCard, updateCardFolio, previousCardQuantity]
  );

  if (isLoadingBasic) return <LoadingState />;
  if (basicError || !basicCardData)
    return <ErrorState message={basicError instanceof Error ? basicError.message : 'Failed to load card'} />;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}
      accessible
      accessibilityLabel={`Card Detail for card ${basicCardData.number}`}
      accessibilityRole="summary"
    >
      <CardImageSection
        imageUrl={basicCardData.imageLarge}
        cardAnimatedStyle={cardImageAnimatedStyle}
        onCardPress={toggleDrawer}
        accessibilityLabel="Card image"
        accessibilityHint="Double tap to open card drawer"
      />

      <AnimatedDrawer
        gestureHandler={gestureHandler}
        animatedStyle={drawerAnimatedStyle}
        onDragHandlePress={toggleDrawer}
        headerComponent={<CardMetaInfo number={basicCardData.number} set={basicCardData.set} />}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={[styles.detailContent, { paddingBottom: insets.bottom }]}
          importantForAccessibility="yes"
        >
          <AddCardButton
            cardId={cardId}
            onQuantityChange={handleCollectionChange}
            initialQuantity={basicCardData.occurrence}
          />

          <TabSwitcher
            options={tabOptions}
            activeTabId={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
            containerStyle={{ marginTop: 8 }}
          />

          <View style={{ marginBottom: theme.spacing.xl }}>
            {activeTab === 'details' ? (
              <CardDetailedInfo cardId={cardId} />
            ) : (
              <>
                <CardPricesInfo cardId={cardId} />
                <CardAvailableOffers cardId={cardId} title="Available Offers" />
              </>
            )}
          </View>
        </ScrollView>
      </AnimatedDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  detailContent: { paddingVertical: 16 },
});
