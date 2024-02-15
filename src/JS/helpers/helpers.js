export function changeDateFormat(dateString){
    let monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];

    const dateSplit = dateString.split("-");
    let day = dateSplit[0];
    let monthIndex = Number(dateSplit[1]).toString();
    let year = dateSplit[2];
    
    return  `${day} ${monthNames[monthIndex -1]} ${year}`;
}