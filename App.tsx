/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {navigationRef, RootStackParamList} from './definitions/navigation';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { PATH_CARD_BOOK, PATH_GAME, PATH_HOME } from './utils/constants';
import CardBook from './component/card book/CardBook';
import CardBookHeader from './component/card book/CardBookHeader';
import Home from './component/home/Home';
import Game from './component/game/Game';
import GameHeader from './component/game/GameHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const noHeader = () => null;
const card_header = () => ()=> <CardBookHeader/>;
const game_header = () => ()=> <GameHeader/>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, 
  };



  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Provider store={store}> 
    <NavigationContainer ref={navigationRef}>
    <StatusBar animated={true}/>
    <View style={styles.wrapper}>
      <RootStack.Navigator initialRouteName={PATH_HOME}>
      <RootStack.Screen
          name={PATH_HOME}
          options={{header: noHeader}}
          component={Home}
        />
        <RootStack.Screen
          name={PATH_CARD_BOOK}
          options={{header: card_header()}}
          component={CardBook}
        />
        <RootStack.Screen
          name={PATH_GAME}
          options={{header: game_header()}}
          component={Game}
        />
      </RootStack.Navigator>
    </View>
  </NavigationContainer>
  </Provider> 
  </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
