import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCardDetail } from '../hooks/queries/useCardsQuery';
import { useCardFolioDelete } from '../../folio/hooks/mutations/useCardFolioDelete';
import { useCardFolioUpdate } from '../../folio/hooks/mutations/useCardFolioUpdate';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';
import CardMetaInfo from '../components/CardMetaInfo';
import CardDetailedInfo from '../components/CardDetailedInfo';
import CardPricesInfo from '../components/CardPricesInfo';
import CardImageSection from '../components/CardImageSection';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';
import AnimatedDrawer from '../components/AnimatedDrawer';
import { useDrawerAnimation } from '../hooks/useDrawerAnimation';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../../../theme/useTheme';
import AddCardButton from '../components/AddCardButton';
import { useCardFolioCollect } from '../../folio/hooks/mutations/useCardFolioCollect';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';
// import CardAvailableOffers from '../components/CardAvailableOffers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  } = useCardDetail(cardId as string);

  const { toggleDrawer, gestureHandler, drawerAnimatedStyle, cardImageAnimatedStyle } =
    useDrawerAnimation();

  useEffect(() => {
    setPreviousCardQuantity(basicCardData?.occurrence ?? 0);
  }, [cardId, basicCardData?.occurrence]);

  // Reset scroll position when cardId changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [cardId]);

  useRefetchOnFocus(refetchCardDetail);

  const tabOptions: TabOption<TabType>[] = [
    { id: 'prices', label: 'Prices' },
    { id: 'details', label: 'Details' },
  ];

  const handleCollectionChange = React.useCallback(
    (cardId: string, quantity?: number) => {
      if (quantity === undefined) return;

      switch (true) {
        case quantity === 0:
          deleteCardFolio({ cardId });
          break;
        case quantity === 1 && previousCardQuantity === 0:
          // POST only when transitioning from 0 to 1
          collectCard({ cardId });
          break;
        case quantity >= 1:
          // PATCH for all other quantity changes
          updateCardFolio({ cardId, occurrence: quantity });
          break;
        default:
          break;
      }

      setPreviousCardQuantity(quantity);
    },
    [deleteCardFolio, collectCard, updateCardFolio, previousCardQuantity]
  );

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
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
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
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={[styles.detailContent, { paddingBottom: insets.bottom }]}
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

          {activeTab === 'details' ? (
            <CardDetailedInfo cardId={cardId} />
          ) : (
            <>
              <CardPricesInfo cardId={cardId} />
              {/* <CardAvailableOffers cardId={cardId} title="Available Offers" /> */}
            </>
          )}
        </ScrollView>
      </AnimatedDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContent: {
    paddingVertical: 16,
  },
});
