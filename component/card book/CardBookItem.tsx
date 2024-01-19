import React from 'react'
import PropTypes from 'prop-types'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { cardDataType } from '../../utils/cardUtils'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'

 const CardBookItem= React.memo(({path,name}:cardDataType)=> { 
  return (
    <Pressable style={styles.card_item_container}>
        <Image style={styles.card_image} source={path}></Image>
        <View style={styles.card_footer}>
            <Text style={styles.cardText}>{name}</Text>
        </View>
    </Pressable>
  )
})

const styles=StyleSheet.create({
    card_image:{
        width:80,
        height:78,
        resizeMode:'stretch',
    },
    card_item_container:{
        width:80,
        margin:4,
        flex:1,
        borderWidth:1,
        borderColor:COLOR_BLACK  
    },
    card_footer:{
       width:80,
       height:25,
       textAlign:'center',    
       backgroundColor:COLOR_BANANA_MANIA 
    },
    cardText:{
       fontFamily:'BalooPaaji',
       paddingBottom:1,
       fontWeight:'400',
       color:COLOR_BLACK,
       textAlign:'center'
    }
})

export default CardBookItem
