import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function inDateFormatYYYYdashMMdashDDDayMustBeBetween1And28To31DependOnMonthAndLeapYear(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength <= 8) return null;

  let yearString = dateString.substring(0, 4);
  let monthString = dateString.substring(5, 7);
  let dayString = dateString.substring(8, Math.min(dateStringLength, 10));

  if (
    !/^\d*$/.test(yearString) ||
    !/^\d*$/.test(monthString) ||
    !/^\d*$/.test(dayString)
  )
    return null;

  var year = parseInt(yearString, 10);
  var month = parseInt(monthString, 10);
  var day = parseInt(dayString, 10);

  return (dateStringLength == 6 && (month == 0 || month == 1)) ||
    (dateStringLength >= 7 && month >= 1 && month <= 12)
    ? null
    : { dayIsNotBetween1And28To31DependOnMonthAndLeapYear: true };
}
