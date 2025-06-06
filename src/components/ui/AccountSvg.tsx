import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AccountSvg = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#1C1B1F"
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 4c1.93 0 3.5 1.57 3.5 3.5S11.93 11 10 11 6.5 9.43 6.5 7.5 8.07 4 10 4Zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C14.43 17.18 12.03 18 10 18Z"
    />
  </Svg>
);
export default AccountSvg;
