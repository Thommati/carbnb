import { isBefore, isAfter } from 'date-fns';

const getMinAndMaxDates = listings => {
  const today = new Date();
  let minDate = null;
  let maxDate = today;

  for (const listing of listings ){
    const start = new Date(listing.start_date);
    const end = new Date(listing.end_date);

    if (!minDate && isBefore(start, today)) {
      minDate = today;
    } else if (!minDate || isBefore(start, minDate)) {
      minDate = start;
    }

    if (isAfter(end, maxDate)) {
      maxDate = end;
    }
  }

  return { minDate, maxDate };
};

export {
  getMinAndMaxDates
};
