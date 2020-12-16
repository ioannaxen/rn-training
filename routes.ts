import { PaletteType } from './screens/ColorPalette'

export enum ROUTES {
  HOME = 'Home',
  COLOR_PALETTE = 'ColorPalette',
  ADD_PALETTE = 'AddPaletteModal',
}

export type MainStackParamList = {
  [ROUTES.HOME]: { newPalette?: PaletteType }
  [ROUTES.COLOR_PALETTE]: { palette: PaletteType }
}

export type RootStackParamList = {
  [ROUTES.ADD_PALETTE]: undefined
}
