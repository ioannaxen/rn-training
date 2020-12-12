import { PaletteType } from './palettes'

export enum ROUTES {
  HOME = 'Home',
  COLOR_PALETTE = 'ColorPalette',
}

export type RootStackParamList = {
  [ROUTES.HOME]: undefined
  [ROUTES.COLOR_PALETTE]: { palette: PaletteType }
}
