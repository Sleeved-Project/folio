import { Image, StyleSheet, Text, View } from 'react-native';
import logo_SLVIcon from '../../../../assets/icons/certi/certi_SLV.png';
import { useTheme } from '../../../theme/useTheme';
import { Certification } from '../types';

interface CertificationBadgeProps {
  certification: Certification;
  shouldMarginLeft?: boolean;
}

export default function CertificationBadge({
  certification,
  shouldMarginLeft = true,
}: CertificationBadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.black,
          marginHorizontal: shouldMarginLeft ? 16 : 0,
        },
      ]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Certification badge. Certified by Sleeved. Grade: ${certification.globalRating}`}
    >
      <Image
        source={logo_SLVIcon}
        style={styles.image}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Sleeved logo"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.authority, { color: theme.colors.text.primary }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel="Certified by Sleeved"
        >
          Certified by: Sleeved
        </Text>
        <Text
          style={[styles.grade, { color: theme.colors.text.secondary }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Grade ${certification.globalRating}`}
        >
          Grade: {certification.globalRating}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 275,
  },
  authority: {
    fontWeight: '600',
    fontSize: 16,
  },
  grade: {
    fontSize: 16,
  },
});
