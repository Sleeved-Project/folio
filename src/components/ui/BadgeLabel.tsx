import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface BadgeLabelProps {
  label: string;
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export default function BadgeLabel({ label, variant }: BadgeLabelProps) {
  if (!label) return null;
  return (
    <Text style={[styles.label, variant === 'light' ? styles.light : styles.dark]}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginTop: 4,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  light: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  dark: {
    backgroundColor: '#333333',
    color: '#ccc',
  },
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  success: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#212529',
  },
});
