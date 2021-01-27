import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function isValidPresentOrFutureDayInDateYYYdMMdDDValidator(
  control: FormControl
) {
  let dateString = control.value;

  let currentDate: any = new Date();
  let currentYear = +currentDate.getFullYear();
  let currentMonth = +currentDate.getMonth() + 1;
  let currentDay = +currentDate.getDate();

  // First check for the pattern
  if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) {
    return { dateIsNotValidInYYYdMMdDD: true };
  }

  // Parse the date parts to integers
  var parts = dateString.split('-');
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  return !(currentYear == year && currentMonth == month && day < currentDay)
    ? null
    : { dayIsNotInPresentOrFutureInCurrentMonthAndYearInDateYYYdMMdDD: true };
}
