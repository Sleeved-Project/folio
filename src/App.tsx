import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './features/auth/context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import SigninScreen from './features/auth/screens/SigninScreen';
import SignupScreen from './features/auth/screens/SignupScreen';
import HomeScreen from './features/home/screens/HomeScreen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query/query-client';

type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

// Navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <AuthStack.Screen name="SignIn" component={SigninScreen} />
      <AuthStack.Screen name="SignUp" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, [isLoading, initialLoadComplete]);

  if (isLoading && !initialLoadComplete) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        {isAuthenticated ? (
          <RootStack.Screen name="App" component={HomeScreen} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
