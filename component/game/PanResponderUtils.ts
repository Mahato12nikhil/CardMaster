import { useState } from 'react';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

interface PanResponderProps {
  onMove?: (gestureState: PanResponderGestureState) => void;
  onRelease?: (gestureState: PanResponderGestureState) => void;
}

const usePanResponder = ({ onMove, onRelease }: PanResponderProps) => {
  const [isFirstCardDraggable, setIsFirstCardDraggable] = useState(true);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      if (isFirstCardDraggable) {
        return gesture.dx !== 0 && gesture.dy !== 0 && gesture.numberActiveTouches === 1;
      }
      return true;
    },
    onMoveShouldSetPanResponder: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      return isFirstCardDraggable;
    },
    onPanResponderMove: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      onMove && onMove(gesture);
    },
    onPanResponderRelease: (event: GestureResponderEvent, gesture: PanResponderGestureState) => {
      onRelease && onRelease(gesture);
      setIsFirstCardDraggable(true);
    },
  });

  return panResponder;
};

export default usePanResponder;
