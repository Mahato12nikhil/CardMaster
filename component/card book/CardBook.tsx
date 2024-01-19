import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { CardData, cardDataType } from '../../utils/cardUtils';
import CardBookItem from './CardBookItem';
import CardItemView from './CardItemView';

 const CardBook=React.memo(()=> {

  function renderItem({item}: {item: cardDataType}) {
   return <CardBookItem path={item.path} name={item.name}/>
  }
  return (
    <View
      style={styles.cardbook_container}
     >
      <Image
        style={styles.cardBook_back_image}
        source={require('../../assets/images/background_card_book.png')}
      />
      <FlatList
        data={CardData}
        renderItem={renderItem}
        keyExtractor={item=>item.name}
        numColumns={4}
        contentContainerStyle={styles.card_list_Container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CardItemView />}
      />   
    </View>
  )
});

const styles=StyleSheet.create({
  card_list_Container:{
    flexGrow: 1,
    top:5
  },
  cardbook_container:{
    flex:1,
  },
  cardBook_back_image:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  }
})

export default CardBook