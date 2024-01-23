import React, { useState, useRef, useEffect } from 'react';
import { Animated, FlatList, Image, StyleSheet, View } from 'react-native';
import { CardData, cardDataType } from '../../utils/cardUtils';
import CardBookItem from './CardBookItem';
import CardItemView from './CardItemView';

const CardBook = React.memo(() => {
  const [selectedCard, setSelectedCard] = useState<cardDataType | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: selectedCard ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [selectedCard]);

  const renderItem = ({ item }: { item: cardDataType }) => (
    <CardBookItem onPress={() => setSelectedCard(item)} path={item.path} name={item.name} />
  );

  return (
    <View style={styles.cardbook_container}>
      <Image
        style={styles.cardBook_back_image}
        source={require('../../assets/images/background.png')}
      />
      <FlatList
        data={CardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={4}
        contentContainerStyle={styles.card_list_Container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Animated.View style={{ opacity }}>
            {selectedCard && <CardItemView onClose={() => setSelectedCard(null)} item={selectedCard} />}
          </Animated.View>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  card_list_Container: {
    flexGrow: 1,
    top: 5,
  },
  cardbook_container: {
    flex: 1,
  },
  cardBook_back_image: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
});

export default CardBook;
