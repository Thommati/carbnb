import { isBefore, addDays } from 'date-fns';

const getMinAndMaxDates = listings => {
  const today = new Date();
  if (listings.length > 0) {
    let disabledDates = [];
    const earliestPossibleStart = new Date(listings[0].start_date);
    const minDate = isBefore(earliestPossibleStart, today) ? today : earliestPossibleStart;
    const maxDate = new Date(listings[listings.length - 1].end_date);

    if (listings.length > 1) {
      for (let i = 1; i < listings.length; i++) {
        let begin = new Date(listings[i - 1].end_date);
        let end = new Date(listings[i].start_date);
        disabledDates = [...disabledDates, ...unavailableDays(begin, end)];
      }
    }

    return { minDate, maxDate, disabledDates };
  }

  return { minDate: today, maxDate: today, disabledDates: [today] };
};

const unavailableDays = (begin, end) => {
  const unavailable = [];
  let refDay = addDays(begin, 1);
  while (isBefore(refDay, end)) {
    unavailable.push(refDay);
    refDay = addDays(refDay, 1);
  }
  return unavailable;
};

export {
  getMinAndMaxDates
};
