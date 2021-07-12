import { isBefore, isAfter, addDays } from 'date-fns';

const getMinAndMaxDates = (listings, orders) => {
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

    if (orders.length > 0) {
      disabledDates = [...disabledDates, ...disableBookedDays(orders)];
    }

    return { minDate, maxDate, disabledDates };
  }

  return { minDate: today, maxDate: today, disabledDates: [today] };
};

// Determine unavailable days to disable that are between listings (availabilities)
const unavailableDays = (begin, end) => {
  const unavailable = [];
  let refDay = addDays(begin, 1);
  while (isBefore(refDay, end)) {
    unavailable.push(refDay);
    refDay = addDays(refDay, 1);
  }
  return unavailable;
};

// Returns a list of days that are already booked to add to disabled days.
const disableBookedDays = orders => {
  const bookedDays = [];
  for (const order of orders) {
    let refDay = new Date(order.start_date);
    const endDay = new Date(order.end_date);
    while (!isAfter(refDay, endDay)) {
      bookedDays.push(refDay);
      refDay = addDays(refDay, 1);
    }
  }

  return bookedDays;
};

// Determine the availability id and price for a range selection
const getListingIdForOrder = (listings, orderDates) => {
  const { startDate, endDate } = orderDates;
  let listingId = null;
  let listingPrice = null;

  for (const listing of listings) {
    const listingStart = new Date(listing.start_date);
    const listingEnd = new Date(listing.end_date);

    if (!isBefore(startDate, listingStart) && !isAfter(endDate, listingEnd)) {
      listingId = listing.id;
      listingPrice = listing.price;
      // return { listingId: listing.id, listingPrice: listing.price };
    }
  }

  return { listingId, listingPrice };
};

// Returns the range of prices available for a car
const getPriceRange = (listings) => {
  let minPrice = null;
  let maxPrice = null;

  if (listings && listings.length > 0) {
    for (const listing of listings) {
      const price = Number(listing.price.replace(/[^0-9.-]+/g,""));
      if (!(minPrice && maxPrice)) {
        minPrice = price;
        maxPrice = price;
      } else if (price < minPrice) {
        minPrice = price
      } else if (price > maxPrice) {
        maxPrice = price;
      }
    }
  }

  return { minPrice, maxPrice };
};

export {
  getMinAndMaxDates,
  getListingIdForOrder,
  getPriceRange,
};
