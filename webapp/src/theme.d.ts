import {} from 'styled-components';
import { Theme } from 'models/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
