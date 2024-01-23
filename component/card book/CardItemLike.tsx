import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COLOR_BLACK } from '../../utils/colors';
import { PointArrayItem } from './CardItemView';

interface CardItemLikeProps {
    positive: PointArrayItem[];
    negative: PointArrayItem[];
  }
export default function CardItemLike({positive,negative}:CardItemLikeProps) {


  function renderItem({ item }: { item: PointArrayItem }) {
    return (
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <Text style={styles.item_text}>{item.key}:</Text>
        <Text style={styles.item_text}>{item.value}</Text>
      </View>
    );
  }

 
  return (
    <View style={styles.like_container}>
      <Text style={styles.like__dislike_header}>Likes</Text>
      <FlatList
        data={positive}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={4}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.like__dislike_header}>Dislikes</Text>
      <FlatList
        data={negative}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  like_container: {
    top:0,
    margin:4
  },
  like__dislike_header:{
    color:COLOR_BLACK,
    fontFamily:'BalooPaaji',
    fontWeight:'400',
    fontSize:20
  },
  item_text:{
    color:COLOR_BLACK,
    fontFamily:'BalooPaaji',
    fontSize:11
  }
});
