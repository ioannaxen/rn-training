import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES, MainStackParamList } from './routes'
import { Home } from './screens/Home'
import { ColorPalette } from './screens/ColorPalette'
import { AddPaletteModal } from './screens/AddPaletteModal'

const RootStack = createStackNavigator()
const MainStack = createStackNavigator<MainStackParamList>()

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name={ROUTES.HOME} component={Home} />
    <MainStack.Screen
      name={ROUTES.COLOR_PALETTE}
      component={ColorPalette}
      options={({
        route: {
          params: {
            palette: { paletteName },
          },
        },
      }) => ({
        title: paletteName,
      })}
    />
  </MainStack.Navigator>
)

const App = () => (
  <NavigationContainer>
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTES.ADD_PALETTE}
        component={AddPaletteModal}
        options={{ title: 'Add new palette' }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default App
