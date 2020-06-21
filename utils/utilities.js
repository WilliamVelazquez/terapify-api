const FIVE_MINUTES_IN_SECONDS = 300;
const SIXTY_MINUTES_IN_SECONDS = 3600;

const getInitialCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0,0,0,0);
  return currentDate;
}

const getlastDateAfterDays = (days = 7) => {
  const laterDate = new Date();
  laterDate.setDate(laterDate.getDate() + days);
  laterDate.setHours(23,59,59,999);
  return laterDate
}

module.exports = {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
  getInitialCurrentDate,
  getlastDateAfterDays,
};
