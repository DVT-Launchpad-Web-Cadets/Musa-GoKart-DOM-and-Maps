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
    !isNaN(Number(dateSplit[0])) &&
    !isNaN(Number(dateSplit[1])) &&
    !isNaN(Number(dateSplit[2]))
  ) {
    const day = dateSplit[0];
    const monthIndex = Number(dateSplit[1]);
    const year = dateSplit[2];

    return `${day} ${monthNames[monthIndex - 1]} ${year}`;
  }

  return 'N/A';
}
