import { timeFormat } from "d3";

export function useTime() {
    const timeData = {
        today: timeFormat("%Y-%m-%d")(new Date()),
        thisYear: timeFormat("%Y")(new Date()),
        thisMonth: timeFormat("%m")(new Date()),
        thisWeek: timeFormat("%W")(new Date())
    }
    return timeData
}