import React from 'react'
import { TouchableOpacity, FlatList, Text } from 'react-native'
import styled from 'styled-components'
import { PaletteType } from '../screens/ColorPalette'
import { ColorPreview } from './ColorPreview'

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

const StyledColorPreview = styled(ColorPreview)`
  margin-right: 10px;
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
      renderItem={({ item: { hexCode } }) => (
        <StyledColorPreview color={hexCode} />
      )}
      keyExtractor={({ colorName }) => colorName}
    />
  </StyledTouchableOpacity>
)
