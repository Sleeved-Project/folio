import * as FileSystem from 'expo-file-system';

/**
 * Downloads an image from a temporary URL and saves it to a local file.
 */
export async function downloadTempImage(tempUrl: string): Promise<string> {
  if (!tempUrl) {
    throw new Error('No URL provided');
  }

  try {
    // Generate a unique temporary file name
    const tempFileName = `sleeved_${Date.now()}.jpg`;
    const localUri = `${FileSystem.cacheDirectory}${tempFileName}`;

    // Download the image
    const result = await FileSystem.downloadAsync(tempUrl, localUri);

    if (result.status !== 200) {
      throw new Error(`Download failed with status ${result.status}`);
    }

    return localUri;
  } catch (error) {
    console.error('Failed to download image:', error);
    throw error;
  }
}
