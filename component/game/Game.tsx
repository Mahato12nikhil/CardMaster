// Game.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RenderCards from './RenderCards'; // Adjust the path accordingly
import BlockContent from './Blocks';
import GameFooter from './GameFooter';
import { cardDataType } from '../../utils/cardUtils';

export interface BlockParams {
  row: number;
  col: number;
}
export interface BlockData {
  capturedBy?: { name:string,captureUrl: any | undefined };
  highlightedBy?: string[] | null;
}
const Game = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([...Array(100).fill({})]);
  const [isCardMoving, setIsCardMoving] = useState(false);
  const [capturedBlocks,setCapturedBlocks]=useState<BlockParams[]>([])

  const updateCardPosition = (newPosition: { x: number; y: number }) => {
    setCardPosition(newPosition);
  };
  const [cardPosition, setCardPosition] = useState({
    x: 0,
    y: 328,
  });
  const [highlightedBlock, setHighlightedBlock] = useState<BlockParams | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.game_container}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.back_image}
            source={require('../../assets/images/background.png')}
          />
          <Text style={{fontFamily:'BalooPaaji', fontSize:20,textAlign:'right',marginRight:10}}>+10</Text>
          
         <BlockContent
            blocks={blocks}
            cardPosition={cardPosition}
            isCardMoving={isCardMoving}
            highlightedBlock={highlightedBlock}
            setHighlightedBlock={setHighlightedBlock}
            setIsCardMoving={setIsCardMoving}
            updateCardPosition={updateCardPosition}
            capturedBlocks={capturedBlocks}
            setBlocks={setBlocks}
            setCapturedBlocks={setCapturedBlocks}
          />
          <RenderCards />
        </View>
      </View>
      <GameFooter/>
      </View>  
  );
};

const styles = StyleSheet.create({
  game_container: {
    flex: 1,
    position:'relative'
  },
  back_image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Game;
