import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'

export default function CardItemView() {
  return (
    <View style={styles.card_item_view_container}>
       
        {/*Image/ base point/ X2 design */}
        <View style={styles.card_img_bspoint_x_cont}>
            <View style={styles.card_item_view_image_container}>
              <Image style={styles.card_item_view_image}
                     source={require('../../assets/images/Adventurer.png')}
                     >
              </Image>
            </View> 
            <View style={{marginLeft:17}}>
                <Text style={[styles.card_item_text,{fontSize: 14,lineHeight:20}]}>Adventurer</Text>
                <Text style={[styles.card_item_text,{fontSize: 19,lineHeight:30}]}>Base points</Text>
                <Text style={[styles.card_item_text,{fontSize: 40, lineHeight:50}]}>10</Text>
            </View>
            <View style={{marginLeft:13,borderWidth:2,borderRadius:10, height:75,marginTop:4}}></View>
            <View style={{marginLeft:17}}>
                <Text style={[styles.card_item_text,{fontSize: 14,lineHeight:20,textAlign:'right'}]}>Adventurer</Text>
                <Text style={[styles.card_item_text,{fontSize: 28,lineHeight:34,textAlign:'right'}]}>X2</Text>

                <Text style={[styles.card_item_text,{fontSize: 19, lineHeight:23,textAlign:'right'}]}>Alchemist</Text>
            </View>
        </View>
        {/* Likes component */}
        
    </View>
  )
}
const styles=StyleSheet.create({
    card_item_view_container:{
        flex:1,
        height:400,
        backgroundColor:COLOR_BANANA_MANIA,
        margin:4,
    },
    card_img_bspoint_x_cont:{
        flex:1,
        flexDirection:'row',
    },
    card_item_view_image_container:{
        borderWidth:1,
        height:102,
        width:102,
        alignItems: 'flex-start',
        borderColor: 'rgba(169, 169, 169, 0.5)',
        marginLeft:4,
        marginTop:4
    },
    card_item_view_image:{
        height:100,
        width:100,
        resizeMode:'contain'
    },
    card_item_text:{
        color: COLOR_BLACK,
        fontFamily: "BalooPaaji",
        fontWeight: '400',
        marginVertical: 2,
    }
})