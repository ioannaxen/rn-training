import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components'
import { ROUTES, RootStackParamList } from '../routes'
import { PALETTES } from '../palettes'
import { PalettePreview } from '../components/PalettePreview'

const SafeArea = styled(SafeAreaView)`
  background-color: white;
  flex-grow: 1;
`

type HomeStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.HOME
>

type Props = {
  navigation: HomeStackNavigationProp
}

export const Home = ({ navigation }: Props) => (
  <SafeArea>
    <FlatList
      data={PALETTES}
      renderItem={({ item: palette }) => (
        <PalettePreview
          onPress={() =>
            navigation.navigate(ROUTES.COLOR_PALETTE, { palette: palette })
          }
          palette={palette}
        />
      )}
      keyExtractor={({ name }) => name}
    />
  </SafeArea>
)
