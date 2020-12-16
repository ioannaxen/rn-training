import React, { useEffect, useCallback, useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components'
import { ROUTES, MainStackParamList, RootStackParamList } from '../routes'
import { PalettePreview } from '../components/PalettePreview'
import { PaletteType } from './ColorPalette'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SafeArea = styled(SafeAreaView)`
  background-color: white;
  flex-grow: 1;
`

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  padding: 15px 0px 0px 10px;
  color: teal;
`

type HomeStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, ROUTES.HOME>,
  StackNavigationProp<RootStackParamList, ROUTES.ADD_PALETTE>
>

type HomeRouteProp = RouteProp<MainStackParamList, ROUTES.HOME>

type Props = {
  navigation: HomeStackNavigationProp
  route: HomeRouteProp
}

export const Home = ({ navigation, route: { params } }: Props) => {
  const newPalette = params ? params.newPalette : null
  const [palettes, setPalettes] = useState<Array<PaletteType>>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    )
    // See https://github.com/kadikraman/color-palette-api
    // for more on this API
    if (result.ok) {
      const data: Array<PaletteType> = await result.json()
      setPalettes(data)
    }
  }, [])

  useEffect(() => {
    fetchPalettes()
  }, [fetchPalettes])

  useEffect(() => {
    if (newPalette) {
      setPalettes((current) => [newPalette, ...current])
    }
  }, [newPalette])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchPalettes()
    setIsRefreshing(false)
  }, [fetchPalettes])

  return (
    <SafeArea>
      <FlatList
        data={palettes}
        renderItem={({ item: palette }) => (
          <PalettePreview
            onPress={() =>
              navigation.navigate(ROUTES.COLOR_PALETTE, { palette: palette })
            }
            palette={palette}
          />
        )}
        keyExtractor={({ paletteName }) => paletteName}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ADD_PALETTE)}
          >
            <Title>Add a color scheme</Title>
          </TouchableOpacity>
        }
      />
    </SafeArea>
  )
}
