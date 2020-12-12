import { ColorType } from '../components/Color'
import { SOLARIZED } from './solarized'
import { RAINBOW } from './rainbow'
import { FRONTEND_MASTERS } from './frontendMasters'

export type PaletteType = {
  name: string
  colors: Array<ColorType>
}

export const PALETTES: Array<PaletteType> = [
  SOLARIZED,
  FRONTEND_MASTERS,
  RAINBOW,
]
