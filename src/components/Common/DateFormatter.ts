export function formatDateString(dateString: string) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  // Create and return the formatted date string
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
