import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Image } from 'react-native';

export async function compressImage(
  imagePath: string,
  maxDim = 1000,
  quality = 80
): Promise<string> {
  const { width, height } = await new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      Image.getSize(imagePath, (w, h) => resolve({ width: w, height: h }), reject);
    }
  );

  let newWidth = width;
  let newHeight = height;

  if (height > maxDim) {
    newWidth = Math.round((width * maxDim) / height);
    newHeight = maxDim;
  }

  const output = await ImageResizer.createResizedImage(
    imagePath.startsWith('file://') ? imagePath : 'file://' + imagePath,
    newWidth,
    newHeight,
    'JPEG',
    quality,
    0,
    undefined,
    false
  );
  return output.uri;
}
