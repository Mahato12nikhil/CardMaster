import { ToastAndroid } from 'react-native';
import { SetStateAction, Dispatch } from 'react';
import { BlockData, BlockParams } from './Game';
import { CardData, cardDataType } from '../../utils/cardUtils';
import mergeData from '../../data/card-merge-info.json';

export interface UpdateBlockParams {
  releasePoint: BlockParams;
  card: any;
  setBlocks: Dispatch<SetStateAction<BlockData[]>>;
}

export function updateBlock({ releasePoint, card, setBlocks }: UpdateBlockParams) {
  const surroundingBlocks = getSurroundingBlocks(releasePoint);

  setBlocks((preVBlocks) => {
    const updatedBlocks = [...preVBlocks];
    let mergedCardName: string | null = null;
    let mergedCardPath;
    const imgIndex = releasePoint.row * 10 + releasePoint.col;

    // If already a card is placed on the place
    if (updatedBlocks[imgIndex]?.capturedBy && updatedBlocks[imgIndex]?.capturedBy?.name) {
      const placedCardName = updatedBlocks[imgIndex].capturedBy?.name;
      if (placedCardName === card.name) {
        // getMergedCard
        const key = card.name;
        mergedCardName = mergeData[key as keyof typeof mergeData];

        // search the updated card path and update
        if (mergedCardName) {
          CardData.forEach((card: cardDataType) => {
            if (card.name === mergedCardName) {
              mergedCardPath = card.path;
            }
          });
          //update the block with merged card
          updateCardImage(mergedCardName,mergedCardPath,updatedBlocks,imgIndex);
          updateHighlightedBlocks(surroundingBlocks,updatedBlocks,mergedCardName);
          ToastAndroid.show('new card: ' + mergedCardName, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('card can not be placed although the same', ToastAndroid.SHORT);
        }
      }
      // Cards are not the same, so can't be placed new card
      else {
        ToastAndroid.show(`different cards can't be placed: ${placedCardName} & ${card.name}`, ToastAndroid.SHORT);
      }
    }
    //no card is placed there so surely new card can be placed there
    //check if it was already highlighted just to check points 
    else{
      updateCardImage(card.name,card.path,updatedBlocks,imgIndex);
      //setHighlighted around it but check if any card present to those points
      updateHighlightedBlocks(surroundingBlocks,updatedBlocks,card.name);
    }

    return updatedBlocks;
  });
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
      };
  });
}

