import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors';
import { HEADER_HEIGHT } from '../../utils/constants';
import StrokedText from '../common/StrokedText';
import { ProgressBar } from '@react-native-community/progress-bar-android';

export default function GameHeader() {
  return (
    <View style={styles.card_book_header_container}>
      <Image source={require('../../assets/images/back.png')} />
      <View style={[styles.headerContent,{marginBottom:12}]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:-5, marginTop:2 }}>
          <Text style={[styles.headerText,]}>Next Level In:</Text>
          <Text style={[styles.headerText, { alignItems: 'flex-end' }]}>500</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={0.1}
            color={COLOR_BLACK}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:-3}}>
          <StrokedText 
            text={'Level 1'}
            mainColor={COLOR_BANANA_MANIA}
            strokeColor={COLOR_BLACK}
            strokeWidth={2}
           
          />
            <StrokedText 
              text={'10'}
              mainColor={COLOR_BANANA_MANIA}
              strokeColor={COLOR_BLACK}
              strokeWidth={2}
              isEnd={true}
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card_book_header_container: {
    height: HEADER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLOR_BANANA_MANIA,
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 25,
    fontFamily: 'BalooPaaji',
    color: COLOR_BLACK,
  },
  progressBarContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
