function getSecondsInTimezone(timeZone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = {};
  formatter.formatToParts(now).forEach(({ type, value }) => {
    parts[type] = value;
  });
  const localTimeString = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  return Math.floor(new Date(localTimeString).getTime());
}

export default getSecondsInTimezone;
