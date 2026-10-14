export function formatDate(date) {
    const dateObj = new Date(date);
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    return dateObj.toLocaleDateString();
}