import startOfDay from 'date-fns-1/src/start_of_day'
import isAfter from 'date-fns-1/src/is_after'

// Helper function that uses date-fns methods to determine if a date is between two other dates
export const dateHourIsBetween = (start, candidate, end) =>
    (candidate.getTime() === start.getTime() || isAfter(candidate, start)) &&
    (candidate.getTime() === end.getTime() || isAfter(end, candidate))

export const dateIsBetween = (start, candidate, end) => {
    const startOfCandidate = startOfDay(candidate)
    const startOfStart = startOfDay(start)
    const startOfEnd = startOfDay(end)

    return (
        (startOfCandidate.getTime() === startOfStart.getTime() || isAfter(startOfCandidate, startOfStart)) &&
        (startOfCandidate.getTime() === startOfEnd.getTime() || isAfter(startOfEnd, startOfCandidate))
    )
}

export const timeIsBetween = (start, candidate, end) => {
    const candidateTime = candidate.getHours() * 60 + candidate.getMinutes()
    const startTime = start.getHours() * 60 + start.getMinutes()
    const endTime = end.getHours() * 60 + end.getMinutes()

    return candidateTime >= startTime && candidateTime <= endTime
}
