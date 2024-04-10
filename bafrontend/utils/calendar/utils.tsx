import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
    return daysMatrix;
  }




  function convertTo12HourFormat(hourStr: string):string {
    try {
  
        // Split the hour string into hours and minutes
        const [hours, minutes] = hourStr.split(':').map(Number);

        // Determine AM or PM
        const period = hours < 12 ? 'AM' : 'PM';

        // Convert to 12-hour format
        let formattedHour;
        if (hours === 0) {
            formattedHour = `12:${minutes} ${period}`;
        } else if (hours > 12) {
            formattedHour = `${hours - 12}:${minutes} ${period}`;
        } else {
            formattedHour = `${hours}:${minutes} ${period}`;
        }

        return formattedHour;
    } catch (error) {
        return 'Invalid input';
    }
}