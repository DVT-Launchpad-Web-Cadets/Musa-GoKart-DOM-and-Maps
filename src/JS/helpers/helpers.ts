export function changeDateFormat(dateString: string){
    let monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];

    const dateSplit = dateString.split("-");
    let day = dateSplit[0];
    let monthIndex: number = Number(dateSplit[1]);
    let year = dateSplit[2];
    
    return  `${day} ${monthNames[monthIndex -1]} ${year}`;
}