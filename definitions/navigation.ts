import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import {
    PATH_HOME,
    PATH_CARD_BOOK
  } from '../utils/constants';

export type RootStackParamList = {
    [PATH_HOME]: undefined;
    [PATH_CARD_BOOK]: undefined;

  };

  export const navigationRef = createNavigationContainerRef<RootStackParamList>();

  export function navigateTo(
    routeName: keyof RootStackParamList,
    params?: object,
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
  }