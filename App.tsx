import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './screens/Home'
import { ColorPalette } from './screens/ColorPalette'
import { ROUTES, RootStackParamList } from './routes'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen
        name={ROUTES.COLOR_PALETTE}
        component={ColorPalette}
        options={({
          route: {
            params: {
              palette: { name },
            },
          },
        }) => ({
          title: name,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
