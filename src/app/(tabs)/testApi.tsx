import React from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../lib/client/http-client';

/**
 * TEMPORARY TEST PAGE
 * This file is for testing purposes only and should be deleted once API integration is confirmed working.
 *
 * NOTE: In production code, queries should be placed in separate files under:
 * - features/[featureName]/hooks/queries/[queryName].ts (for queries)
 * - features/[featureName]/hooks/mutations/[mutationName].ts (for mutations)
 */

interface TestData {
  id: string;
  name: string;
  [key: string]: unknown;
}

function useTestQuery() {
  return useQuery({
    queryKey: ['test-fetch'],
    queryFn: async () => {
      try {
        return await httpClient.get<TestData[]>('/', { apiType: 'global' });
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
  });
}

export default function TestApi() {
  const { data, isLoading, isError, error } = useTestQuery();

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>API Test Screen</Text>

        {isLoading && (
          <View>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text>Loading data...</Text>
          </View>
        )}

        {isError && (
          <View>
            <Text>Loading error</Text>
            <Text>{error instanceof Error ? error.message : 'An error occurred'}</Text>
          </View>
        )}

        {data && (
          <View>
            <Text>Received data:</Text>
            <Text>{JSON.stringify(data, null, 2)}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
