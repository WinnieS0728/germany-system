interface options {
    toFix?: number
}

export function getPercent(num1: number, num2: number, options?: options): number {
    const number = num2 === 0 ? num1 : num1 / num2 * 100

    if (options) {
        const { toFix } = options
        return Number(number.toFixed(toFix))
    }

    return Number(number.toFixed(0))
}