import styled from 'styled-components'
import { View } from 'react-native'

type Props = {
  color: string
}

export const ColorPreview = styled(View)`
  height: 30px;
  width: 30px;
  background-color: ${({ color }: Props) => color};
  box-shadow: 0 2px 2px #b8b8b8ff;
`
