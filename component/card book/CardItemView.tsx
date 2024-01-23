import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'
import CardItemLike from './CardItemLike'
import { cardDataType } from '../../utils/cardUtils'
const pointsData = require('../../data/points.json');

interface CardItemViewProps {
    item:cardDataType | null
    onClose: () => void;
  }

  export interface PointArrayItem {
    key: string;
    value: number;
  }

export default function CardItemView({onClose,item}:CardItemViewProps) {
    const [positive, setPositive] = useState<PointArrayItem[]>([]);
    const [negative, setNegative] = useState<PointArrayItem[]>([]);

    useEffect(() => {
        const positiveValues: PointArrayItem[] = [];
        const negativeValues: PointArrayItem[] = [];
        const key = item?.name;
        const specificObject = pointsData.find((item: any) => item.Key === key);
    
        if (specificObject) {
          Object.entries(specificObject).forEach(([key, value]) => {
            if (typeof value === 'number') {
              if (value >= 0) {
                positiveValues.push({ key, value });
              } else {
                negativeValues.push({ key, value });
              }
            }
          });
          setPositive(positiveValues);
          setNegative(negativeValues);
        }
      }, [item]);
    
    
  return (
    <View style={styles.card_item_view_container}>
       
        {/*Image/ base point/ X2 design */}
        <Pressable onPress={onClose} style={styles.card_img_bspoint_x_cont}>
            <Pressable onPress={onClose} style={styles.card_item_view_image_container}>
              <Image style={styles.card_item_view_image}
                     source={item?.path}
                     >
              </Image>
            </Pressable> 
            <View style={{marginLeft:17}}>
                <Text style={[styles.card_item_text,{fontSize: 14,lineHeight:20}]}>{item?.name}</Text>
                <Text style={[styles.card_item_text,{fontSize: 19,lineHeight:30}]}>Base points</Text>
                <Text style={[styles.card_item_text,{fontSize: 40, lineHeight:50}]}>10</Text>
            </View>
            <View style={{marginLeft:13,borderWidth:2,borderRadius:10, height:75,marginTop:4}}></View>
            <View style={{marginLeft:17}}>
                <Text style={[styles.card_item_text,{fontSize: 14,lineHeight:20,textAlign:'right'}]}>Adventurer</Text>
                <Text style={[styles.card_item_text,{fontSize: 28,lineHeight:34,textAlign:'right'}]}>X2</Text>

                <Text style={[styles.card_item_text,{fontSize: 19, lineHeight:23,textAlign:'right'}]}>Alchemist</Text>
            </View>
        </Pressable>
        {/* Likes component */}
        <CardItemLike positive={positive} negative={negative} />
        
    </View>
  )
}
const styles=StyleSheet.create({
    card_item_view_container:{
        flex:1,
        justifyContent:'flex-start',
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