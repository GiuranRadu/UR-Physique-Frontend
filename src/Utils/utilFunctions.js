export function convertMinutesToHours(minutes) {
  // Calculate hours by dividing minutes by 60
  const hours = Math.floor(minutes / 60);
  // Calculate remaining minutes after converting to hours
  const remainingMinutes = minutes % 60;
  // Return the result as a string in the format "hours:minutes"
  return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
}


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}