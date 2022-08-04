// @flow

import isBefore from 'date-fns-1/src/is_before'

import * as dateUtils from '../date-utils'

const linear = (selectionStart, selectionEnd, dateList) => {
    let selected = []
    if (selectionEnd == null) {
        if (selectionStart) selected = [selectionStart]
    } else if (selectionStart) {
        const reverseSelection = isBefore(selectionEnd, selectionStart)
        selected = dateList.reduce(
            (acc, dayOfTimes) =>
                acc.concat(
                    dayOfTimes.filter(
                        t =>
                            selectionStart &&
                            selectionEnd &&
                            dateUtils.dateHourIsBetween(
                                reverseSelection ? selectionEnd : selectionStart,
                                t,
                                reverseSelection ? selectionStart : selectionEnd
                            )
                    )
                ),
            []
        )
    }
    return selected
}

export default linear
