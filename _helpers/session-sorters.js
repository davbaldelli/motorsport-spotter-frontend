import moment from "moment";

const sortByDateTime = (a,b) => {
  const dateTimeA = moment(`${a.date} ${a.time}`)
  const dateTimeB = moment(`${b.date} ${b.time}`)
  return dateTimeA.isAfter(dateTimeB) ? 1 : -1
}
export const sessionSorters = {
  sortByDateTime
}


