const formatDate = (date: string) => {
    const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const releaseDate = new Date(date);

    return `${MONTHS[releaseDate.getMonth()]} ${releaseDate.getUTCDate()}, ${releaseDate.getFullYear()}`;
}


export default formatDate;