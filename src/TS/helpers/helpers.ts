export function changeDateFormat(dateString: string) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dateSplit = dateString.split('-');
  if (
    !(
      dateSplit.length === 3 &&
      !isNaN(Number(dateSplit[0])) &&
      !isNaN(Number(dateSplit[1])) &&
      !isNaN(Number(dateSplit[2]))
    )
  ) {
    return 'N/A';
  }

  const day = dateSplit[0];
  const monthIndex = Number(dateSplit[1]);
  const year = dateSplit[2];

  if (monthIndex - 1 >= 0 && monthIndex - 1 < monthNames.length) {
    return `${day} ${monthNames[monthIndex - 1]} ${year}`;
  }
  return 'N/A';
}
