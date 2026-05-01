import { IANATimeZone } from "./timezone"
import { DateTime } from "luxon"

export const convertJsDateToFormatDateString = (
  date: Date,
  format: string,
  timeZone?: IANATimeZone
) => {
  try {
    const dateTime = DateTime.fromJSDate(date)
    if (timeZone) {
      dateTime.setZone(timeZone)
    }
    if (!dateTime.isValid) {
      throw new Error(`Invalid Date object: ${date.toString()}`)
    }

    return dateTime.toFormat(format)
  } catch (error) {
    console.error("Error formatting Date:", error)
    throw error
  }
}
