import React from 'react'
import { TouchableOpacity, FlatList, View, Text } from 'react-native'
import styled from 'styled-components'
import { PaletteType } from '../screens/ColorPalette'

const StyledTouchableOpacity = styled(TouchableOpacity)`
  margin: 15px 10px;
`

const StyledText = styled(Text)`
  font-weight: bold;
  padding-bottom: 10px;
`

// Required due to issue with styled components and TypeScript:
// https://github.com/styled-components/styled-components/issues/1803
const StyledFlatList: new <T>() => FlatList<T> = styled(FlatList)`
  flex-direction: row;
` as any

const ColorPreview = styled(View)`
  height: 30px;
  width: 30px;
  background-color: ${({ color }: { color: string }) => color};
  margin-right: 10px;
  box-shadow: 0 2px 2px #b8b8b8ff;
`

type Props = {
  onPress: () => void
  palette: PaletteType
}

export const PalettePreview = ({ onPress, palette }: Props) => (
  <StyledTouchableOpacity onPress={onPress}>
    <StyledText>{palette.paletteName}</StyledText>
    <StyledFlatList
      data={palette.colors.slice(0, 5)}
      renderItem={({ item: { hexCode } }) => <ColorPreview color={hexCode} />}
      keyExtractor={({ colorName }) => colorName}
    />
  </StyledTouchableOpacity>
)
