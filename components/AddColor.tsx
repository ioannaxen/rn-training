import React from 'react'
import { View, Text, Switch } from 'react-native'
import styled from 'styled-components'
import { ColorType } from './Color'
import { ColorPreview } from './ColorPreview'

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: black;
  border-style: solid;
  padding: 10px 0px;
`

const Description = styled(View)`
  flex-direction: row;
  align-items: center;
`

const StyledColorPreview = styled(ColorPreview)`
  margin: 0px 10px;
`

const Title = styled(Text)`
  font-weight: bold;
`

type Props = {
  color: ColorType
  isEnabled: boolean
  onValueChange: (color: ColorType, newValue: boolean) => void
}

export const AddColor = ({ color, isEnabled, onValueChange }: Props) => {
  const { hexCode, colorName } = color
  return (
    <Container>
      <Description>
        <StyledColorPreview color={hexCode} />
        <Title>{colorName}</Title>
      </Description>
      <Switch
        value={isEnabled}
        onValueChange={(newValue) => onValueChange(color, newValue)}
      />
    </Container>
  )
}
