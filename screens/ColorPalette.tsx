import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import styled from 'styled-components/native'
import { ROUTES, RootStackParamList } from '../routes'
import { Color } from '../components/Color'

const Container = styled(View)`
  padding: 10px;
  background-color: white;
  flex-grow: 1;
`

const Title = styled(Text)`
  font-weight: bold;
  padding-bottom: 10px;
`

type ColorPaletteRouteProp = RouteProp<RootStackParamList, ROUTES.COLOR_PALETTE>

type Props = {
  route: ColorPaletteRouteProp
}

export const ColorPalette = ({
  route: {
    params: {
      palette: { name, colors },
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
      ListHeaderComponent={<Title>{name}</Title>}
    />
  </Container>
)
