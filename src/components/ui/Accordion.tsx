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

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  rightElement?: React.ReactNode;
}

export default function Accordion({
  title,
  children,
  initiallyOpen = false,
  rightElement,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={toggleAccordion}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {isOpen ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
        </View>

        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    color: '#333',
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
    borderTopColor: '#f0f0f0',
  },
});
