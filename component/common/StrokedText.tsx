import React from 'react';
import { View } from 'react-native';
import Svg, { Text } from 'react-native-svg';

// StrokedText component
 const StrokedText = ({ text, mainColor, strokeColor, strokeWidth, isEnd }: any) => {
    return (
      <View >
        <Svg height="24" width="100">
          <Text
            x={isEnd?"100%":'1'} // Adjust the x attribute to position the text to the right
            y="20"
            fontSize="25"
            fontFamily="BalooPaaji"
            fill={mainColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            textAnchor={isEnd?"end":'start'} // Align text to the end
          >
            {text}
          </Text>
        </Svg>
      </View>
    );
  };
  
export default StrokedText