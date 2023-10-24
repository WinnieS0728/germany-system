export function getMonthArray(searchMonth: string | null) {
    if (!searchMonth) {
        return undefined
    }
    const startMonth = searchMonth.split('_')[0]
    const endMonth = searchMonth.split('_')[1]
    if (!endMonth) {
        return [startMonth]
    }
    const monthArray: string[] = []

    for (let month = Number(startMonth); month <= Number(endMonth); month++) {
        const MM = month < 10 ? `0${month}` : String(month)

        monthArray.push(MM)
    }

    return monthArray
}