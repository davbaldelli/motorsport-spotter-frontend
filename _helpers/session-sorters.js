const sortByDateTime = (a,b) => {
  const dateTimeA = `${a.date} ${a.time}`
  const dateTimeB = `${b.date} ${b.time}`
  return dateTimeA > dateTimeB
}
export const sessionSorters = {
  sortByDateTime
}


