import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

export type ColorType = {
  colorName: string
  hexCode: string
}

const Box = styled(View)`
  margin: 5px 0;
  background-color: ${({ color }: { color: string }) => color};
  padding: 10px;
  align-items: center;
`

const BoxText = styled(Text)`
  font-weight: bold;
  color: ${({ color }: { color: string }) => color};
`

const getTextColor = (hexCode: string): string =>
  parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white'

export const Color = ({ colorName, hexCode }: ColorType) => (
  <Box color={hexCode}>
    <BoxText color={getTextColor(hexCode)}>
      {colorName} {hexCode}
    </BoxText>
  </Box>
)
