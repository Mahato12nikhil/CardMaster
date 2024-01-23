import React from 'react'
import { Image, Text, View } from 'react-native'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'

export default function GameFooter() {
  return (
    <View style={{height:50,flexDirection:'row',backgroundColor:COLOR_BANANA_MANIA, alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../../assets/images/undo.png')}></Image>
        <Text style={{color:COLOR_BLACK,textAlign: 'right',fontSize:30,fontFamily:'BalooPaaji',marginLeft:4}}>14 Turns Remaining</Text>
    </View>
  )
}
