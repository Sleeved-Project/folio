import { useState } from 'react';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View, Text } from 'react-native';
import { SCREEN_DIMENSIONS } from '../../../constants';
import { CameraOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AdHeaderProps {
  imageRecto: string;
  imageVerso: string;
  title: string;
}

export default function AdHeader({ imageRecto, imageVerso, title }: AdHeaderProps) {
  const screenWidth = SCREEN_DIMENSIONS.WIDTH;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']} locations={[0, 1]} style={styles.background} />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
        accessible
        accessibilityRole="scrollbar"
        accessibilityLabel={`${title} images`}
      >
        {imageRecto.length > 0 ? (
          <>
            <Image
              key="recto"
              source={{ uri: imageRecto }}
              style={[styles.image, { width: screenWidth }]}
              resizeMode="contain"
              accessible
              accessibilityLabel={`${title} Recto`}
            />
            <Image
              key="verso"
              source={{ uri: imageVerso }}
              style={[styles.image, { width: screenWidth }]}
              resizeMode="contain"
              accessible
              accessibilityLabel={`${title} Verso`}
            />
          </>
        ) : (
          <View style={[styles.image, { width: screenWidth, backgroundColor: '#f5f5f5' }]} accessible accessibilityLabel={`No images available for ${title}`}>
            <CameraOff size={48} color="#ccc" style={{ alignSelf: 'center', marginTop: 100 }} />
            <Text style={{ textAlign: 'center', color: '#aaa' }}>No images available</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.pagination}>
        {imageRecto != '' && imageVerso != '' ? (
          <>
            <View
              key="recto"
              style={[styles.dot, activeIndex === 0 ? styles.dotActive : styles.dotInactive]}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Recto image"
              accessibilityState={{ selected: activeIndex === 0 }}
            />
            <View
              key="verso"
              style={[styles.dot, activeIndex === 1 ? styles.dotActive : styles.dotInactive]}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Verso image"
              accessibilityState={{ selected: activeIndex === 1 }}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', height: 360, backgroundColor: '#f5f5f5' },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%' },
  container: { flex: 1, marginTop: 20, marginBottom: 30 },
  image: { height: '100%', overflow: 'hidden' },
  pagination: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: '#000' },
  dotInactive: { backgroundColor: '#ccc' },
});
