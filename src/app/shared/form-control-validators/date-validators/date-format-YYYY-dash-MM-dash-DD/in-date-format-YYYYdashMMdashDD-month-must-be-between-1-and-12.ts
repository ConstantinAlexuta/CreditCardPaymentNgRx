import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function inDateFormatYYYYdashMMdashDDMonthMustBeBetween1And12(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength <= 5) return null;

  let yearString = dateString.substring(0, 4);
  let monthString = dateString.substring(5, Math.min(dateStringLength, 7));

  if (!/^\d*$/.test(yearString) || !/^\d*$/.test(monthString)) return null;

  var month = parseInt(monthString, 10);

  return (dateStringLength == 6 && (month == 0 || month == 1)) ||
    (dateStringLength >= 7 && month >= 1 && month <= 12)
    ? null
    : { monthIsNotBetween1And12: true };
}
