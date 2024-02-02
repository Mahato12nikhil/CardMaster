import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CardBookItem from '../card book/CardBookItem';
import { CardData, cardDataType } from '../../utils/cardUtils';
import { useDispatch } from 'react-redux';
import { updateTopCard } from '../../redux/card';
import { useAppSelector } from '../../redux/customHooks';


const RenderCards = (

) => {
  const {turn}=useAppSelector(state=>state.game)
  const dispatch = useDispatch();
  const [selectedCards, setSelectedCards] = useState<cardDataType[]>([]);
  const [shiftedElement, setShiftedElement] = useState<cardDataType | null>(null);
  const [dispatchNeeded, setDispatchNeeded] = useState(false);

  useEffect(() => {
    const shuffledCards = shuffleArray(CardData);
    const firstCard = shuffledCards[0];
    const first8Cards = shuffledCards.slice(1, 8);
    setSelectedCards(first8Cards);
    dispatch(updateTopCard(firstCard));
  }, []);

  useEffect(() => {
     if(selectedCards.length<1) return
     let shiftedElement
     setSelectedCards((cardsarr) => {
       shiftedElement = cardsarr.shift();
      
      const shuffledCards = shuffleArray(CardData);
      cardsarr.push(shuffledCards[0]);
      if (shiftedElement) {
        setShiftedElement(shiftedElement);
        setDispatchNeeded(true);
      }
      return [...cardsarr];
    });
 
  }, [turn]);


  useEffect(() => {
    if (dispatchNeeded && shiftedElement) {
      dispatch(updateTopCard(shiftedElement));
      setDispatchNeeded(false);
    }
  }, [dispatchNeeded, shiftedElement]);



  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array: cardDataType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <View style={styles.cards_container}>
      <View style={[styles.cardRow, { marginLeft: 90 }]}>
        {selectedCards.slice(0, 3).map((card, index) => (
          <View key={index} style={styles.cardItem}>
            <CardBookItem onPress={null} path={card.path} name={card.name} />
          </View>
        ))}
      </View>
      <View style={styles.cardRow}>
        {selectedCards.slice(3, 7).map((card, index) => (
          <View key={index} style={styles.cardItem}>
            <CardBookItem onPress={null} path={card.path} name={card.name} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cards_container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 95,
  },
  cardItem: {
    margin: 1,
  },
});

export default RenderCards;
