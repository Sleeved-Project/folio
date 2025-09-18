import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Plus, Minus } from 'lucide-react-native';

// Constants
const BUTTON_HEIGHT = 48;
const ICON_SIZE = 20;
const DEBOUNCE_TIME = 150;
const LONG_PRESS_INTERVAL = 200;
const LONG_PRESS_AMOUNT = 10;
const MAX_QUANTITY = 100;

interface AddCardButtonProps {
  cardId: string;
  initialQuantity?: number;
  onQuantityChange: (cardId: string, quantity: number) => void;
  style?: React.ComponentProps<typeof View>['style'];
}

export default function AddCardButton({
  cardId,
  initialQuantity = 0,
  onQuantityChange,
  style,
}: AddCardButtonProps) {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(Math.min(initialQuantity, MAX_QUANTITY));
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<'increment' | 'decrement' | null>(null);
  const [isRecentlyRemoved, setIsRecentlyRemoved] = useState(false);
  const [isMaxQuantity, setIsMaxQuantity] = useState(initialQuantity >= MAX_QUANTITY);

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize quantity and max quantity state based on initialQuantity prop
  useEffect(() => {
    setQuantity(Math.min(initialQuantity ?? 0, MAX_QUANTITY));
    setIsMaxQuantity((initialQuantity ?? 0) >= MAX_QUANTITY);
  }, [initialQuantity]);

  // Clear interval helper
  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearInterval(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const debouncedQuantityChange = useCallback(
    (newQuantity: number) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        onQuantityChange(cardId, newQuantity);
      }, 350);
    },
    [onQuantityChange, cardId]
  );

  // Handle quantity increment
  const handleIncrement = useCallback(
    (amount = 1) => {
      if (quantity + amount > MAX_QUANTITY) {
        const newQuantity = MAX_QUANTITY;
        setQuantity(newQuantity);
        setIsMaxQuantity(true);
        debouncedQuantityChange(newQuantity);
        return;
      }

      const newQuantity = quantity + amount;
      setQuantity(newQuantity);
      setIsMaxQuantity(newQuantity >= MAX_QUANTITY);
      debouncedQuantityChange(newQuantity);
    },
    [quantity, debouncedQuantityChange]
  );

  // Handle quantity decrement
  const handleDecrement = useCallback(
    (amount = 1) => {
      if (quantity <= amount) {
        clearLongPressTimer();
        setIsLongPressing(false);
        setCurrentOperation(null);
        setQuantity(0);
        setIsMaxQuantity(false);
        debouncedQuantityChange(0);
        setIsRecentlyRemoved(true);
        setTimeout(() => setIsRecentlyRemoved(false), DEBOUNCE_TIME);
        return;
      }
      const newQuantity = quantity - amount;
      setQuantity(newQuantity);
      setIsMaxQuantity(false);
      debouncedQuantityChange(newQuantity);
    },
    [quantity, debouncedQuantityChange, clearLongPressTimer]
  );

  // Long press handlers
  const handleLongPressIncrement = useCallback(() => {
    if (quantity >= MAX_QUANTITY) return;
    handleIncrement(LONG_PRESS_AMOUNT);
    setIsLongPressing(true);
    setCurrentOperation('increment');
  }, [handleIncrement, quantity]);

  const handleLongPressDecrement = useCallback(() => {
    if (quantity <= LONG_PRESS_AMOUNT) {
      handleDecrement(1);
      return;
    }
    handleDecrement(LONG_PRESS_AMOUNT);
    setIsLongPressing(true);
    setCurrentOperation('decrement');
  }, [quantity, handleDecrement]);

  const handlePressOut = useCallback(() => {
    setIsLongPressing(false);
    setCurrentOperation(null);
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  // Effect for long press interval
  useEffect(() => {
    if (!isLongPressing || !currentOperation) return;

    clearLongPressTimer();

    if (currentOperation === 'decrement' && quantity <= LONG_PRESS_AMOUNT) {
      setIsLongPressing(false);
      setCurrentOperation(null);
      return;
    }

    if (currentOperation === 'increment' && quantity >= MAX_QUANTITY) {
      setIsLongPressing(false);
      setCurrentOperation(null);
      return;
    }

    const handler =
      currentOperation === 'increment'
        ? () => handleIncrement(LONG_PRESS_AMOUNT)
        : () => handleDecrement(LONG_PRESS_AMOUNT);

    longPressTimerRef.current = setInterval(handler, LONG_PRESS_INTERVAL);

    return clearLongPressTimer;
  }, [
    isLongPressing,
    currentOperation,
    quantity,
    handleIncrement,
    handleDecrement,
    clearLongPressTimer,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearLongPressTimer();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [clearLongPressTimer]);

  // Render incrementer for existing items
  if (quantity > 0) {
    return (
      <View style={[styles.container, style]} accessible>
        <View style={styles.incrementerContainer}>
          <TouchableOpacity
            onPress={() => handleDecrement()}
            onLongPress={handleLongPressDecrement}
            onPressOut={handlePressOut}
            style={[styles.actionButton, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.medium }]}
            activeOpacity={0.7}
            delayLongPress={500}
            accessibilityLabel="Decrease quantity"
            accessibilityRole="button"
            accessibilityState={{ disabled: quantity === 0 }}
          >
            <Minus size={ICON_SIZE} color="white" />
          </TouchableOpacity>

          <View
            style={[styles.quantityContainer, { backgroundColor: theme.colors.variants.primaryLight, borderRadius: theme.borderRadius.medium }]}
            accessible
            accessibilityRole="text"
            accessibilityLabel={`${quantity} ${quantity === 1 ? 'card' : 'cards'} owned`}
          >
            <Text style={[styles.quantityText, { color: theme.colors.primary }]}>
              {`${quantity} ${quantity === 1 ? 'card' : 'cards'} owned`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleIncrement()}
            onLongPress={handleLongPressIncrement}
            onPressOut={handlePressOut}
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.medium, opacity: isMaxQuantity ? 0.6 : 1 },
            ]}
            activeOpacity={0.7}
            delayLongPress={500}
            disabled={isMaxQuantity}
            accessibilityLabel="Increase quantity"
            accessibilityRole="button"
            accessibilityState={{ disabled: isMaxQuantity }}
          >
            <Plus size={ICON_SIZE} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Render add button for new items
  return (
    <View style={[styles.container, style]} accessible>
      <TouchableOpacity
        onPress={() => {
          const newQuantity = quantity + 1;
          setQuantity(newQuantity);
          setIsMaxQuantity(newQuantity >= MAX_QUANTITY);
          onQuantityChange(cardId, newQuantity);
        }}
        style={[styles.addButton, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.medium }]}
        activeOpacity={0.7}
        disabled={isRecentlyRemoved}
        accessibilityLabel="Add card to collection"
        accessibilityRole="button"
        accessibilityState={{ disabled: isRecentlyRemoved }}
      >
        <Text style={styles.addButtonText}>Add to my collection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    height: BUTTON_HEIGHT,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  incrementerContainer: {
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    width: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    flex: 1,
    height: BUTTON_HEIGHT,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
