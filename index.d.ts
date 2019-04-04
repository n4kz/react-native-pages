import { Color } from 'csstype'
import React from 'react'
import { ViewStyle, Animated, ViewProps } from 'react-native'

declare module 'react-native-pages' {
  export interface IPagesProps extends ViewProps {
    /**
     * Scroll direction
     */
    horizontal?: boolean

    /**
     * RTL mode for horizontal scroll
     */
    rtl?: boolean

    /**
     * Start page
     */
    startPage?: number

    /**
     * Page indicator color
     */
    indicatorColor?: Color

    /**
     * 	Page indicator opacity (inactive dots)
     */
    indicatorOpacity?: number

    /**
     * Page indicator position
     */
    indicatorPosition?: string

    /**
     * Style for container view
     */
    containerStyle?: ViewStyle

    /**
     * Animated.Value updated with progress
     */
    progress?: Animated.Value

    /**
     * Scroll end callback
     */
    onScrollEnd?: (progress: number) => void

    /**
     * Render pager callback
     */
    renderPager?: {
      pages: number
      progress: Animated.Value
      indicatorColor: Color
      indicatorOpacity: number
      indicatorPosition: 'bottom' | 'right'
      horizontal: boolean
      rtl: boolean
    }
  }

  export class Pages extends React.PureComponent<IPagesProps> {}

  export interface IIndicatorProps {
    style?: ViewStyle
    pages: number
    progress: Animated.Value
    indicatorColor: Color
    indicatorOpacity: number
    indicatorPosition: 'top' | 'right' | 'bottom' | 'left'
  }

  export class Indicator extends React.PureComponent<IIndicatorProps> {}
}
