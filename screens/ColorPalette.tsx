import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import styled from 'styled-components/native'
import { ROUTES, MainStackParamList } from '../routes'
import { Color, ColorType } from '../components/Color'

export type PaletteType = {
  paletteName: string
  colors: Array<ColorType>
}

const Container = styled(View)`
  padding: 10px;
  background-color: white;
  flex-grow: 1;
`

const Title = styled(Text)`
  font-weight: bold;
  padding-bottom: 10px;
`

type ColorPaletteRouteProp = RouteProp<MainStackParamList, ROUTES.COLOR_PALETTE>

type Props = {
  route: ColorPaletteRouteProp
}

export const ColorPalette = ({
  route: {
    params: {
      palette: { paletteName, colors },
    },
  },
}: Props) => (
  <Container>
    <FlatList
      data={colors}
      renderItem={({ item: { hexCode, colorName } }) => (
        <Color colorName={colorName} hexCode={hexCode} />
      )}
      keyExtractor={({ hexCode }) => hexCode}
      ListHeaderComponent={<Title>{paletteName}</Title>}
    />
  </Container>
)
