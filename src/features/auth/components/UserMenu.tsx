import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings } from 'lucide-react-native';
import AccountSvg from '../../../components/ui/AccountSvg';
import { useTheme } from '../../../theme/useTheme';

export default function UserMenu() {
  const { logout, user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const theme = useTheme();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setMenuVisible(false);
            await logout();
          } catch {
            Alert.alert('Logout Failed', 'There was a problem logging out. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {menuVisible && (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.iconButton}>
        <AccountSvg width={24} height={24} fill={theme.colors.text.primary} />
      </TouchableOpacity>

      {menuVisible && (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: theme.colors.background.primary,
              shadowColor: theme.shadows.medium.shadowColor,
              shadowOffset: theme.shadows.medium.shadowOffset,
              shadowOpacity: theme.shadows.medium.shadowOpacity,
              shadowRadius: theme.shadows.medium.shadowRadius,
              elevation: theme.shadows.medium.elevation,
            },
          ]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
            <Settings size={18} color={theme.colors.text.primary} />
            <Text style={[styles.menuItemText, { color: theme.colors.text.primary }]}>
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
            <LogOut size={18} color={theme.colors.danger} />
            <Text style={[styles.menuItemText, styles.logoutText, { color: theme.colors.danger }]}>
              Logout
            </Text>
          </TouchableOpacity>

          <View style={[styles.userInfo, { borderTopColor: theme.colors.border.light }]}>
            <Text style={[styles.emailText, { color: theme.colors.text.tertiary }]}>
              {user?.email}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'transparent',
    width: 5000,
    height: 5000,
    zIndex: 50,
  },
  iconButton: {
    padding: 8,
    zIndex: 60,
  },
  menu: {
    position: 'absolute',
    top: 45,
    right: 0,
    borderRadius: 12,
    padding: 8,
    width: 200,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutItem: {
    marginTop: 4,
  },
  logoutText: {
    color: '#FF3B30',
  },
  userInfo: {
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  emailText: {
    fontSize: 12,
  },
});
