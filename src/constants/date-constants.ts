export const monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const dayConstants = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const getDateString = (releaseDate: string) => {
  if (!releaseDate) {
    return '';
  }

  const date = new Date(releaseDate);
  const dateString = `${monthLabel[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return dateString;
}

export const getAge = (dateString: string) => {
  if (!dateString) {
    return '';
  }

  const date1 = new Date(dateString);
  let date2 = new Date();
  let yearsDiff =  date2.getFullYear() - date1.getFullYear();

  return yearsDiff;
}
