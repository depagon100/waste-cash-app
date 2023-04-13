import * as dateFns from 'date-fns';

export const formatDate = (date: Date) =>
  dateFns.isToday(date)
    ? dateFns.format(date, 'H:mm')
    : dateFns.format(date, 'MMM d');
