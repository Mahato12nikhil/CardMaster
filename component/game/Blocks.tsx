// SvgContent.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions, ToastAndroid } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import CardBookItem from '../card book/CardBookItem';
import RenderCards from './RenderCards';
import { COLOR_BANANA_MANIA, COLOR_BLACK, COLOR_DELI_YELLOW } from '../../utils/colors';
import usePanResponder from './PanResponderUtils';
import { useAppDispatch, useAppSelector } from '../../redux/customHooks';
import { BlockData, BlockParams } from './Game';
import { CardData,cardDataType } from '../../utils/cardUtils';
import mergeData from '../../data/card-merge-info.json';
import { getPositonPoint, updateBlock, updateSetBlock } from './blockUtils';
import { updateBlocks, updateLevel, updatePoint, updateTurn } from '../../redux/gameSlice';
import { GAME_BASE_POINT, LEVEL_INCREASE_POINT, TURN_DECREMENT, TURN_INCREMENT } from '../../utils/constants';

interface BlockContentProps {
  blocks: BlockData[];
  cardPosition: { x: number; y: number };
  isCardMoving: boolean;
  setIsCardMoving: React.Dispatch<React.SetStateAction<boolean>>;
  updateCardPosition: (newPosition: { x: number; y: number }) => void;
  floatPoint:number;
  setFloatPoint:Dispatch<SetStateAction<number>>;
  isBoardUpdated:boolean
  setIsBoardUpdated:Dispatch<SetStateAction<boolean>>
}

const BlockContent: React.FC<BlockContentProps> = ({
  blocks,
  cardPosition,
  isCardMoving,
  setIsCardMoving,
  updateCardPosition,
  floatPoint,
  setFloatPoint,
}) => {
  const { card } = useAppSelector(state => state.card);
  const { totalPoint,level,turn,isBoardUpdated } = useAppSelector(state => state.game);
  const dispatch=useAppDispatch()
  const BLOCK_SIZE = 33;
  const screenWidth = Dimensions.get('window').width;
  const totalWidth = 10 * BLOCK_SIZE;
  const xOffset = (screenWidth - totalWidth) / 2;
  const [releasePoint,setReleasePoint]=useState<BlockParams>({row:-1,col:-1})
  const [movingCardPosition, setMovingCardPosition] = useState<{ row: number; col: number } | null>(null);

  const panResponder = usePanResponder({
    onMove: gesture => {
      if(turn===15){
        ToastAndroid.show('you have no turn left', ToastAndroid.SHORT)
        return
      }
      const { dx, dy } = gesture;
      updateCardPosition({
        x: cardPosition.x + dx,
        y: cardPosition.y + dy,
      });
       const nearestBlock = findNearestBlock(gesture.moveX, gesture.moveY);
      
        setMovingCardPosition(nearestBlock)
        setReleasePoint(nearestBlock)
        setFloatPoint(getPositonPoint(blocks,nearestBlock,card,isBoardUpdated));
      
      if (!isCardMoving) setIsCardMoving(!isCardMoving);
    },
    onRelease: gesture => {
      updateCardPosition({
        x: 0,
        y: 328,
      });
      setIsCardMoving(false);
      if(releasePoint.row>=0 && releasePoint.row<10 && releasePoint.col>=0 && releasePoint.col<10){
        const {updatedBlocks,isCardPlaced,imgIndex}=updateSetBlock(blocks,card,releasePoint,isBoardUpdated,dispatch)
        dispatch(updateBlocks(updatedBlocks))
        if(isCardPlaced){
          dispatch(updatePoint( {lastPoint:floatPoint,lastUpdatedIndex:imgIndex}))
          dispatch(updateTurn(TURN_DECREMENT))
        }
      }   
      const levelTargetPoint=(level*LEVEL_INCREASE_POINT)+GAME_BASE_POINT

      if(totalPoint+floatPoint>=levelTargetPoint){
        dispatch(updateLevel()) 
        dispatch(updateBlocks([...Array(100).fill({})]))
      }
      //console.log(blocks)
      setFloatPoint(0)
      setMovingCardPosition(null)
    },
  });

  const findNearestBlock = (x: number, y: number) => {
    const col = Math.floor(x / BLOCK_SIZE)-1;
    const row = Math.floor(y / BLOCK_SIZE)-6;
    return { row, col };
  };
  return (
    <Svg height={330} width={350} color={COLOR_BLACK}>
      {
        blocks.map((block,index)=>{
          
          if(block.capturedBy){
           
            //if(movingCardPosition) getnewUrl()
            return(
              <View key={index} style={{ position: 'absolute', left: xOffset + (index % 10) * BLOCK_SIZE, top: Math.floor(index / 10) * BLOCK_SIZE }}>
                 {movingCardPosition && movingCardPosition.row===Math.floor(index / 10)  && movingCardPosition.col===index % 10?
                  <Image
                      width={BLOCK_SIZE}
                      height={BLOCK_SIZE}
                      source={card.path}
                      style={{ height: 34, width: 34, borderRadius: 3, borderWidth: 1, borderColor: 'red', resizeMode: 'cover' }}
                    />
                    :
                    <Image
                      width={BLOCK_SIZE}
                      height={BLOCK_SIZE}
                      source={block.capturedBy.captureUrl}
                      style={{ height: 34, width: 34, borderRadius: 3, borderWidth: 1, borderColor: 'black', resizeMode: 'cover' }}
                    />
                  }
                </View>
                
            )
          }
          else{
            const fillColor = block.highlightedBy && block.highlightedBy.length > 0 ? COLOR_DELI_YELLOW : COLOR_BANANA_MANIA;
          
             return (
              
              movingCardPosition && movingCardPosition.row===Math.floor(index / 10)  && movingCardPosition.col===index % 10?
                
              <View key={index} style={{ position: 'absolute', left: xOffset + (index % 10) * BLOCK_SIZE, top: Math.floor(index / 10) * BLOCK_SIZE }}>
                    <Image
                        width={BLOCK_SIZE}
                        height={BLOCK_SIZE}
                        source={card.path}
                        style={{ height: 34, width: 34, borderRadius: 3, borderWidth: 1, borderColor: 'black', resizeMode: 'cover' }}
                      />
                  </View>
                :
                <Rect
                    key={index}
                    x={xOffset + (index % 10) * BLOCK_SIZE}
                    y={Math.floor(index / 10) * BLOCK_SIZE}
                    width={BLOCK_SIZE}
                    height={BLOCK_SIZE}
                    rx={3}
                    ry={3}
                    fill={fillColor}
                    stroke="black"
                    strokeWidth="1"
                  />  
              )
          }
          
        })
      } 
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          margin: 1,
          marginTop: 3,
          left: cardPosition.x,
          top: cardPosition.y,
          zIndex: 2,
          opacity: isCardMoving ? 0.3 : 1,
        }}
      >
        <CardBookItem onPress={null} path={card.path} name={card.name} highlighted={true} />
      </Animated.View>
    </Svg>
  );
};

export default BlockContent;


