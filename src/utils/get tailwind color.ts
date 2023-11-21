import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'
import defaultColors from 'tailwindcss/colors'

type defaultColors = typeof defaultColors
type extendColors = typeof theme['extend']['colors']
type colors = defaultColors & extendColors

const { theme } = resolveConfig(tailwindConfig)
const colors: colors = (theme as unknown as {
    colors: colors
}).colors

type colorName_returnString = {
    [K in keyof colors]: colors[K] extends string ? K : never
}[keyof colors]
type colorName_returnObj = {
    [K in keyof colors]: colors[K] extends object ? K : never
}[keyof colors]

export function getTailwindColor<C extends colorName_returnString>(colorName: C): colors[C]
export function getTailwindColor<C extends colorName_returnObj>(colorName: C, scale: keyof colors[C]): colors[C][keyof colors[C]]

export function getTailwindColor<C extends colorName_returnString | colorName_returnObj>(colorName: C, scale?: keyof colors[C]): colors[C] | colors[C][keyof colors[C]]
{
    if (scale) {
        return colors[colorName][scale]
    }

    return colors[colorName]
}

getTailwindColor('confirmTable','new')