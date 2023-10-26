interface options {
    toFix?: number
}
export function getLocaleString(number: number, options?: options): string {

    if (options) {
        const { toFix } = options

        return number.toLocaleString(undefined, {
            maximumFractionDigits: toFix,
            minimumFractionDigits: 0
        })
    }

    return number.toLocaleString(undefined, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    })
}