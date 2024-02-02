import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { COLOR_BANANA_MANIA, COLOR_BLACK } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../redux/customHooks'
import { TOTAL_TURN, TURN_DECREMENT, TURN_INCREMENT } from '../../utils/constants'
import { undoLastTurn } from './blockUtils'
import { reducePoint, updateBlocks, updateTurn } from '../../redux/gameSlice'
import { BlockData } from './Game'

export default function GameFooter() {
  const {turn,blocks,updatedIndices}=useAppSelector(state=>state.game)
  const dispatch=useAppDispatch()

  function undoOperation(): void {
    const lastIndex = updatedIndices ? [...updatedIndices] : undefined;
    if(lastIndex!==undefined && lastIndex.length>0){
      const poppedVal=lastIndex.pop()
      const point=poppedVal?.point
      const index=poppedVal?.index
      const  updatedBlocks= undoLastTurn(index!,blocks)
      dispatch(updateBlocks(updatedBlocks))
      dispatch(updateTurn(TURN_INCREMENT))
      dispatch(reducePoint(point!))
      
    }
  }

  return (
    <View style={{height:50,flexDirection:'row',backgroundColor:COLOR_BANANA_MANIA, alignItems:'center',justifyContent:'center'}}>
        <Pressable onPress={undoOperation} disabled={turn===0} >
          <Image source={require('../../assets/images/undo.png')}></Image>
        </Pressable>
       
        <Text style={{color:COLOR_BLACK,textAlign: 'right',fontSize:30,fontFamily:'BalooPaaji',marginLeft:4}}>{TOTAL_TURN-turn} Turns Remaining</Text>
    </View>
  )
}
