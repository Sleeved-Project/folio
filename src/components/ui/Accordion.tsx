import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  rightElement?: React.ReactNode;
  accessibilityLabel?: string;
}

export default function Accordion({
  title,
  children,
  initiallyOpen = false,
  rightElement,
  accessibilityLabel,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const theme = useTheme();

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          borderColor: theme.colors.border.light,
          borderRadius: theme.borderRadius.medium,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={toggleAccordion}
        activeOpacity={0.7}
        accessible
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityLabel={accessibilityLabel || title}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
          {isOpen ? (
            <ChevronUp size={20} color={theme.colors.text.secondary} />
          ) : (
            <ChevronDown size={20} color={theme.colors.text.secondary} />
          )}
        </View>
        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.content, { borderTopColor: theme.colors.border.light }]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  rightElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
  },
});
