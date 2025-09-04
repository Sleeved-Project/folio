import { useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
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
      <LinearGradient
        colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
        locations={[0, 1]}
        style={styles.background}
      >
        {imageRecto.length > 0 ? (
          <Image
            source={{ uri: imageRecto }}
            style={[styles.image, { width: screenWidth }]}
            resizeMode="cover"
            blurRadius={54}
          />
        ) : (
          <View style={[styles.image, { width: screenWidth, backgroundColor: '#f5f5f5' }]} />
        )}
      </LinearGradient>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
      >
        {imageRecto.length > 0 ? (
          <>
            <Image
              key="recto"
              source={{ uri: imageRecto }}
              style={[styles.image, { width: screenWidth }]}
              resizeMode="contain"
              alt={`${title} Recto`}
            />
            <Image
              key="verso"
              source={{ uri: imageVerso }}
              style={[styles.image, { width: screenWidth }]}
              alt={`${title} Verso`}
              resizeMode="contain"
            />
          </>
        ) : (
          <View style={[styles.image, { width: screenWidth, backgroundColor: '#f5f5f5' }]}>
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
            />
            <View
              key="verso"
              style={[styles.dot, activeIndex === 1 ? styles.dotActive : styles.dotInactive]}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: 360,
    backgroundColor: '#f5f5f5',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    height: '100%',
    overflow: 'hidden',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#000',
  },
  dotInactive: {
    backgroundColor: '#ccc',
  },
});
