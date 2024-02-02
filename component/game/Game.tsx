// Game.js
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RenderCards from './RenderCards'; // Adjust the path accordingly
import BlockContent from './Blocks';
import GameFooter from './GameFooter';
import { cardDataType } from '../../utils/cardUtils';
import { useAppSelector } from '../../redux/customHooks';
import Sound from 'react-native-sound';
const path= require('../../assets/audio/game2BGM.wav');

export interface BlockParams {
  row: number;
  col: number;
}
export interface BlockData {
  capturedBy?: { name:string,captureUrl: any | undefined };
  highlightedBy?: string[] | null;
}


const Game = () => {
  
  const {blocks,turn}=useAppSelector(state=>state.game)
  const [isCardMoving, setIsCardMoving] = useState(false);
  const [level,setLevel]=useState<number>(0);
  const [floatPoint, setFloatPoint]=useState<number>(0)
  const [totalPoint, setTotalPoint]=useState<number>(0);
  const [isBoardUpdated,setIsBoardUpdated]=useState<boolean>(false)
  const [sound, setSound] = useState<Sound | undefined>();
  
  const updateCardPosition = (newPosition: { x: number; y: number }) => {
    setCardPosition(newPosition);
  };
  const [cardPosition, setCardPosition] = useState({
    x: 0,
    y: 328,
  });
  const [highlightedBlock, setHighlightedBlock] = useState<BlockParams | null>(null);



  useEffect(() => {
    let sound: Sound | undefined;

    const loadSound = async () => {
      sound = new Sound(path, (error) => {  
        if (error) {
          console.error('Error loading sound', error);
        } else {
          // Set the numberOfLoops to -1 for infinite loop
          console.log('tutru');
          sound?.setNumberOfLoops(-1);
          sound?.setVolume(0.2);
          sound?.play((success) => {
            if (success) {
              console.log('Sound played successfully');
            } else {
              console.error('Error playing sound');
            }
          });
        }
      });
      sound.play()
      
      return sound;
    };

    loadSound();

    return () => {
      // Stop and release the sound when the component unmounts
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.game_container}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.back_image}
            source={require('../../assets/images/background.png')}
          />
          <Text style={{fontFamily:'BalooPaaji', fontSize:20,textAlign:'right',marginRight:10}}>{floatPoint!==0?(floatPoint>0?'+':'')+floatPoint:' '}</Text>
          
         <BlockContent
            blocks={blocks}
            cardPosition={cardPosition}
            isCardMoving={isCardMoving}
            setIsCardMoving={setIsCardMoving}
            updateCardPosition={updateCardPosition}
            floatPoint={floatPoint}
            setFloatPoint={setFloatPoint}
            isBoardUpdated={isBoardUpdated}
            setIsBoardUpdated={setIsBoardUpdated}
          />
          <RenderCards/>
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
