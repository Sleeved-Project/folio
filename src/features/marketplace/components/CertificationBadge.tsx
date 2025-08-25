import { CreativeCommons } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Certification } from '../types';

interface CertificationBadgeProps {
  certification: Certification;
}

export default function CertificationBadge({ certification }: CertificationBadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.black,
        },
      ]}
    >
      {certification.authority.logoUrl ? (
        <Image source={{ uri: certification.authority.logoUrl }} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <CreativeCommons color={theme.colors.text.secondary} size={18} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={[styles.authority, { color: theme.colors.text.primary }]}>
          Certified by : {certification.authority.name}
        </Text>
        <Text style={[styles.grade, { color: theme.colors.text.secondary }]}>
          Grade : {certification.grade} ({certification.label})
        </Text>
      </View>
      <>
        <Text style={[styles.grade, { color: theme.colors.text.secondary }]}>
          {certification.grade}
        </Text>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    marginRight: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    marginHorizontal: 16,
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
