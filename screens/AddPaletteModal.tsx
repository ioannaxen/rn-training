import React, { useState, useCallback } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'
import styled from 'styled-components'
import { ROUTES, MainStackParamList } from '../routes'
import { ColorType } from '../components/Color'
import { AddColor } from '../components/AddColor'
import { COLORS } from '../allColors'
import { PaletteType } from './ColorPalette'

const TITLE_ERROR = 'Please enter a palette name'
const NUMBER_COLORS_ERROR = 'Please select at least 3 colors'

const Container = styled(View)`
  background-color: white;
  padding: 15px 10px;
  margin-bottom: 180px;
`

const Title = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`

const StyledTextInput = styled(TextInput)`
  border: 1px solid gray;
  margin: 10px 0px 30px;
  padding: 10px;
  border-radius: 6px;
`

const ButtonWrapper = styled(View)`
  position: absolute;
  bottom: 0px;
  background-color: white;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 40px;
  width: 100%;
`

const Button = styled(TouchableOpacity)`
  background-color: teal;
  padding: 10px;
  border-radius: 4px;
  flex-grow: 1;
  margin: 0px 10px;
`

const ButtonText = styled(Text)`
  color: white;
  font-weight: bold;
  text-align: center;
`

type Props = {
  navigation: StackNavigationProp<MainStackParamList, ROUTES.HOME>
}

export const AddPaletteModal = ({ navigation }: Props) => {
  const [title, setTitle] = useState<string | undefined>()
  const [selectedColors, setSelectedColors] = useState<Array<ColorType>>([])

  const handleValueChange = useCallback(
    (selectedColor: ColorType, newValue: boolean) => {
      if (newValue === true) {
        setSelectedColors((current) => [...current, selectedColor])
      } else {
        setSelectedColors((current) =>
          current.filter(
            (color) => color.colorName !== selectedColor.colorName,
          ),
        )
      }
    },
    [setSelectedColors],
  )

  const handleSubmit = useCallback(() => {
    const numberColors = selectedColors.length
    if (!title || numberColors < 3) {
      const errors = []
      if (!title) {
        errors.push(TITLE_ERROR)
      }
      if (numberColors < 3) {
        errors.push(NUMBER_COLORS_ERROR)
      }
      const message = errors.join('\n')
      Alert.alert(
        'Invalid submission',
        message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      )
      return
    }
    const newPalette: PaletteType = {
      paletteName: title,
      colors: selectedColors,
    }
    navigation.navigate(ROUTES.HOME, {
      newPalette,
    })
  }, [title, selectedColors, navigation])

  return (
    <React.Fragment>
      <Container>
        <Title>Name of your color palette</Title>
        <StyledTextInput value={title} onChangeText={setTitle} />
        <FlatList
          data={COLORS}
          renderItem={({ item }) => (
            <AddColor
              color={item}
              isEnabled={
                !!selectedColors.find(
                  (color) => color.colorName === item.colorName,
                )
              }
              onValueChange={handleValueChange}
            />
          )}
          keyExtractor={({ colorName, hexCode }) => colorName.concat(hexCode)}
        />
      </Container>
      <ButtonWrapper>
        <Button onPress={handleSubmit}>
          <ButtonText>Submit!</ButtonText>
        </Button>
      </ButtonWrapper>
    </React.Fragment>
  )
}
