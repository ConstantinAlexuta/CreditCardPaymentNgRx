import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function inDateFormatYYYYdashMMdashDDMonthMustBeGreaterOrEqualWithCurrentMonthIfIsCurrentYear(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength <= 5) return null;

  let yearString = dateString.substring(0, 4);
  let monthString: string = dateString.substring(
    5,
    Math.min(dateStringLength, 7)
  );

  let monthStringLength = monthString.length;

  if (!/^\d*$/.test(yearString) || !/^\d*$/.test(monthString)) return null;

  let currentDate: any = new Date();
  let currentYear = +currentDate.getFullYear();
  let currentMonth = +currentDate.getMonth() + 1;

  var month = parseInt(monthString, 10);
  var year = parseInt(yearString, 10);

  return year < currentYear ||
    (monthStringLength == 1 && month >= 2) ||
    (monthStringLength == 1 && month == 1 && currentMonth < 10) ||
    (year == currentYear &&
      monthStringLength == 1 &&
      currentMonth < 10 &&
      month == 0) ||
    (year == currentYear && monthStringLength == 2 && month == 0) ||
    (year == currentYear && monthStringLength == 2 && month >= currentMonth)
    ? null
    : { monthIsNotGreaterOrEqualWithCurrentMonthInCurrentYear: true };
}
