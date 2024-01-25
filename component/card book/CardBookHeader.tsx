import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'
import { HEADER_HEIGHT } from '../../utils/constants'
import { goBack } from '../../definitions/navigation'

export default function CardBookHeader() {
  return (
    <View style={styles.card_book_header_container}>
        <Pressable onPress={goBack}>
         <Image source={require('../../assets/images/back.png')} />
      </Pressable>
        <Text style={styles.headerText}>Tile Book</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    card_book_header_container: {
        height: HEADER_HEIGHT,
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        backgroundColor: COLOR_BANANA_MANIA,
      },
    headerText: {
        flex: 1,
        textAlign:'center',
        fontWeight:'400',
        fontSize:40,
        fontFamily:'BalooPaaji',
        color:COLOR_BLACK,
        
         
      },
})