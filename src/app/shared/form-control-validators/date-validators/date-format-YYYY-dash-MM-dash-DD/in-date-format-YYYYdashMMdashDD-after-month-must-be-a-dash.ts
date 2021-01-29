import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDAfterMonthMustBeADash(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  return dateStringLength < 8 ||
    (dateStringLength >= 8 && dateString.substring(7, 8) == '-')
    ? null
    : { afterMonthMustBeADash: true };
}
