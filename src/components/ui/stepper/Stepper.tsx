import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import StepItem from './StepItem';
import StepSeparator from './StepSeparator';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepPress: (index: number) => void;
  itemWidth?: number;
  separatorWidth?: number;
  separatorMarginHorizontal?: number;
}

export default function Stepper({
  steps,
  currentStep,
  onStepPress,
  itemWidth = 40,
  separatorWidth = 64,
  separatorMarginHorizontal = 32,
}: StepperProps) {
  const ITEM_WITH_TOTAL_SEPARATOR_WIDTH =
    itemWidth + separatorWidth + separatorMarginHorizontal * 2;
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentStep,
      animated: true,
      viewPosition: 0,
    });
  }, [currentStep]);

  return (
    <FlatList
      ref={flatListRef}
      data={steps}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      style={[styles.flatList, { marginBottom: theme.spacing.md }]}
      renderItem={({ item, index }) => (
        <View style={[styles.container]}>
          <StepItem
            step={item}
            index={index}
            isActive={currentStep === index}
            isCompleted={currentStep > index}
            onPress={() => onStepPress(index)}
            disabled={index > currentStep}
            style={{ width: itemWidth }}
          />
          {index < steps.length - 1 && (
            <StepSeparator
              isCompleted={currentStep > index}
              width={separatorWidth}
              marginHorizontal={separatorMarginHorizontal}
            />
          )}
        </View>
      )}
      getItemLayout={(_, index) => ({
        length: ITEM_WITH_TOTAL_SEPARATOR_WIDTH,
        offset: index * ITEM_WITH_TOTAL_SEPARATOR_WIDTH,
        index,
      })}
      initialScrollIndex={currentStep}
    />
  );
}
const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
    height: 'auto',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
});
