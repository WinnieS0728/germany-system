import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'
import defaultColors from 'tailwindcss/colors'

const { theme } = resolveConfig(tailwindConfig)

type defaultColors = typeof defaultColors
type extendColors = typeof theme['extend']['colors']

const colors = (theme as unknown as {
    colors: defaultColors & extendColors
}).colors

type colorName = (keyof defaultColors | keyof extendColors)

export function getTailwindColor<C extends colorName>(colorName: C): Extract<typeof colors[C], string>
export function getTailwindColor<C extends colorName>(colorName: C, scale: keyof typeof colors[C]): typeof colors[C][NonNullable<typeof scale>]


export function getTailwindColor<C extends colorName>(colorName: C, scale?: keyof typeof colors[C]): typeof colors[C] | typeof colors[C][NonNullable<typeof scale>] {

    if (scale) {
        return colors[colorName][scale]
    }

    return colors[colorName]
}