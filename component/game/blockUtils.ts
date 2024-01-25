import { ToastAndroid } from 'react-native';
import { SetStateAction, Dispatch } from 'react';
import { BlockData, BlockParams } from './Game';
import { CardData, cardDataType } from '../../utils/cardUtils';
import mergeData from '../../data/card-merge-info.json';
import pointsData from '../../data/points.json';
import { BASE_POINT } from '../../utils/constants';

export interface UpdateBlockParams {
  releasePoint: BlockParams;
  card: any;
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
  setTotalPoint:Dispatch<SetStateAction<number>>;
  isBoardUpdated:boolean
}

export function updateBlock({ releasePoint, card, setBlocks,isBoardUpdated }: UpdateBlockParams) {
  setBlocks((prevBlocks) =>{return updateSetBlock(prevBlocks,card,releasePoint,isBoardUpdated)});
}

function getSurroundingBlocks(center: { row: number; col: number }): { row: number; col: number }[] {
  const surroundingBlocks: { row: number; col: number }[] = [];
  for (let i = center.row - 1; i <= center.row + 1; i++) {
    for (let j = center.col - 1; j <= center.col + 1; j++) {
      if (i !== center.row || j !== center.col) {
        if (i >= 0 && i < 10 && j >= 0 && j < 10) {
          surroundingBlocks.push({ row: i, col: j });
        }
      }
    }
  }
  return surroundingBlocks;
}

function updateCardImage(mergedCardName: string, mergedCardPath: undefined, updatedBlocks: BlockData[], imgIndex: number) {
    const newCapturedBy = {
      name: mergedCardName,
      captureUrl: mergedCardPath,
    };
    updatedBlocks[imgIndex] = {
      ...updatedBlocks[imgIndex],
      capturedBy: newCapturedBy,
      highlightedBy: null,
    };
}

function updateHighlightedBlocks(surroundingBlocks: { row: number; col: number; }[], updatedBlocks: BlockData[], name: any) {
  surroundingBlocks.forEach((block) => {
    const index = block.row * 10 + block.col;
    if(!updatedBlocks[index].capturedBy)
      updatedBlocks[index] = {
        highlightedBy: [...(updatedBlocks[index]?.highlightedBy || []), name],
        capturedBy:undefined
      };
  });
}

function updateSetBlock(prevBlocks:any,card:cardDataType,releasePoint:any,isBoardUpdated:boolean){
  const updatedBlocks = [...prevBlocks];
  const {alreadyCard,mergeable,isHighlighted,mergedCardName}=checkCardPosition(prevBlocks,releasePoint,card)

  let mergedCardPath;
  const imgIndex = releasePoint.row * 10 + releasePoint.col;
  if(alreadyCard){
    if(mergeable && mergedCardName){
      const surroundingBlocks = getSurroundingBlocks(releasePoint);
      CardData.forEach((card: cardDataType) => {
        if (card.name === mergedCardName) {
          mergedCardPath = card.path;
        }
      });
      //update the block with merged card
      updateCardImage(mergedCardName,mergedCardPath,updatedBlocks,imgIndex);
      updateHighlightedBlocks(surroundingBlocks,updatedBlocks,mergedCardName);
      ToastAndroid.show('new card: ' + mergedCardName, ToastAndroid.SHORT);
    }
    else{
      ToastAndroid.show('cannot be merged' + mergedCardName, ToastAndroid.SHORT);
    }
  }
  else if(!isBoardUpdated || isHighlighted){ 
    const surroundingBlocks = getSurroundingBlocks(releasePoint);
    updateCardImage(card.name,card.path,updatedBlocks,imgIndex);
    updateHighlightedBlocks(surroundingBlocks,updatedBlocks,card.name);
  }
  return updatedBlocks
}

export function getPositonPoint(prevBlocks:any,positionPoint:any,card:cardDataType,isBoardUpdated:boolean):number{
  const {alreadyCard,mergeable,mergedCardName,isHighlighted,highlightedBy}=checkCardPosition(prevBlocks,positionPoint,card)

  if(alreadyCard && mergeable && mergedCardName){
    return BASE_POINT*2
  }
  if(isHighlighted){
    let count=0
    const data = pointsData.find((item: any) => item.Key === card.name);
    if(data){
      highlightedBy.forEach((highlighter:string)=>{
        count+=Number(data[highlighter as keyof typeof data])
      })
    }
    return count;
  }
  if(!isBoardUpdated){
    return BASE_POINT
  }

  return 0;
} 

function checkCardPosition(prevBlocks:any,positionPoint:any,card:cardDataType){
    let alreadyCard=false
    let isHighlighted=false
    let mergeable=false
    let highlightedBy=[]
  
    const updatedBlocks = [...prevBlocks];
    let mergedCardName: string | null = null;

    const imgIndex = positionPoint.row * 10 + positionPoint.col;

    // If already a card is placed on the place
    if (updatedBlocks[imgIndex] && updatedBlocks[imgIndex].capturedBy && updatedBlocks[imgIndex].capturedBy?.name && updatedBlocks[imgIndex]?.capturedBy?.captureUrl) {
      alreadyCard=true
      const placedCardName = updatedBlocks[imgIndex].capturedBy?.name;
      if (placedCardName === card.name) {
        const key = card.name;
        mergedCardName = mergeData[key as keyof typeof mergeData];
        if (mergedCardName) {
           mergeable=true
        } else {
           mergeable=false
        }
      }
    }
    else if(updatedBlocks[imgIndex] && updatedBlocks[imgIndex].highlightedBy){
      isHighlighted=true
      highlightedBy=updatedBlocks[imgIndex].highlightedBy
    }
    return {alreadyCard,mergeable,mergedCardName,isHighlighted,highlightedBy};
}
