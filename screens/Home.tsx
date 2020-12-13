import React, { useEffect, useCallback, useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components'
import { ROUTES, RootStackParamList } from '../routes'
import { PalettePreview } from '../components/PalettePreview'
import { PaletteType } from './ColorPalette'

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

export const Home = ({ navigation }: Props) => {
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
      />
    </SafeArea>
  )
}
