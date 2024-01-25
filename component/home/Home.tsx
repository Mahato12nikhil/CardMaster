import React from 'react';
import { ImageBackground, Text, View, StyleSheet, Button, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { COLOR_BANANA_MANIA } from '../../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, navigateTo } from '../../definitions/navigation';
import { PATH_CARD_BOOK, PATH_GAME } from '../../utils/constants';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home() {
  function handlePress(Component: string): void {
      navigateTo((Component===PATH_GAME?PATH_GAME:PATH_CARD_BOOK),{})
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
              style={styles.home_button_back}
              onPress={()=>handlePress(PATH_GAME)}
            >
            <Text style={styles.home_button_text}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.home_button_back,{marginTop:5}]}
            onPress={()=>handlePress(PATH_CARD_BOOK)}
          >
            <Text style={[styles.home_button_text]}>Tile Book</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  home_button_back:{
    borderRadius: 12,
    borderWidth: 2,
    width:'50%',
    borderColor:COLOR_BANANA_MANIA ,
    backgroundColor:'rgba(6, 28, 52, 0.70)',
  },
  home_button_text:{
    fontFamily:'BalooPaaji',
    fontSize:35,
    textAlign:'center',
  }

});
