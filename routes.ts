import { PaletteType } from './screens/ColorPalette'

export enum ROUTES {
  HOME = 'Home',
  COLOR_PALETTE = 'ColorPalette',
}

export type RootStackParamList = {
  [ROUTES.HOME]: undefined
  [ROUTES.COLOR_PALETTE]: { palette: PaletteType }
}
